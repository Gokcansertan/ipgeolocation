import { BadRequestException, HttpException, HttpStatus } from '@nestjs/common';
import axios from 'axios';
import { IpGeoLocationEntity } from '../../application/modules/ipgeolocation/models/entity/ip-geo-location.entity';
import { ipGeoLocationConf } from '../../application/modules/ipgeolocation/models/conf/ip-geo-location-conf';

export class IpGeoLocation {
  async dateTimeOut(time: Date, expiredDay = 30): Promise<boolean> {
    const expireTime = new Date(
      time.getTime() + 1000 * 60 * 60 * 24 * expiredDay,
    ).getTime();
    return Date.now() > expireTime;
  }

  async queryAPI(ipAddress: string) {
    const queryAPI = await axios.get(
      `${ipGeoLocationConf.APIURL}${ipGeoLocationConf.APIKEY}${ipGeoLocationConf.APIQUERY}${ipAddress}`,
    );

    return queryAPI.data;
  }

  async findDBIpAddress(ipAddress: string) {
    const findDBIpAddress = IpGeoLocationEntity.findOne({
      where: {
        ip: ipAddress,
      },
      raw: true,
      order: [['createdAt', 'DESC']],
    });
    return findDBIpAddress;
  }

  async registerIP(ipAddress: string) {
    const findDB = await this.findDBIpAddress(ipAddress);
    if (findDB)
      throw new BadRequestException('ip address already saved please update');

    const queryAPI = await this.queryAPI(ipAddress);
    console.log(queryAPI);
    const saveIP = await IpGeoLocationEntity.create({ ...queryAPI });
    if (!saveIP)
      throw new BadRequestException('Error occurred while registering ip');
    return { Process: 'register', ...saveIP };
  }

  async updateIP(ipAddress: string) {
    const findDB = await this.findDBIpAddress(ipAddress);
    if (!findDB)
      throw new BadRequestException(
        'ip address not available in database please register',
      );
    const findTime = JSON.parse(JSON.stringify(findDB.time_zone));
    const isTimeOut = await this.dateTimeOut(new Date(findTime.current_time));
    if (!isTimeOut) return { process: 'DB-Data', ...findDB };
    const queryAPI = await this.queryAPI(ipAddress);
    const updateDB = await IpGeoLocationEntity.update(
      { ...queryAPI },
      { where: { ip: ipAddress } },
    );
    if (!updateDB) throw new BadRequestException('update data is error');
    return { process: 'data Update', ...queryAPI };
  }

  async deleteIP(ipAddress: string) {
    const findDB = await this.findDBIpAddress(ipAddress);
    if (!findDB) throw new BadRequestException('ip address not found');
    const removeIp = await IpGeoLocationEntity.destroy({
      where: {
        ip: ipAddress,
      },
    });
    if (!removeIp) throw new BadRequestException('delete ip is error');
    return { Message: 'remove is ip ' + ipAddress };
  }
}
