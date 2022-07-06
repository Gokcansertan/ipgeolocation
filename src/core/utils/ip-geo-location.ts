import { HttpException, HttpStatus } from '@nestjs/common';
import axios from 'axios';
import { IpgeolocationEntity } from '../../application/modules/ipgeolocation/models/entity/ipgeolocation.entity';
import { ipgeolocationConf } from '../../application/modules/ipgeolocation/models/conf/ipgeolocationConf';

export class IpGeoLocation {
  async dateTimeout(dbTime, timeoutDate = 30) {
    const dbTimeOut =
      new Date(dbTime).getTime() + 1000 * 60 * 60 * 24 * timeoutDate;
    const nowTime = Date.now();
    const dateTimeOutControl = nowTime > dbTimeOut ? true : false;
    return dateTimeOutControl;
  }

  async queryMock(data) {
    return {
      ip: data.ip,
      continent_code: data.continent_code,
      continent_name: data.continent_name,
      country_code2: data.country_code2,
      country_code3: data.country_code2,
      country_name: data.country_name,
      country_capital: data.country_capital,
      state_prov: data.state_prov,
      district: data.district,
      city: data.city,
      zipcode: data.zipcode,
      latitude: data.latitude,
      longitude: data.longitude,
      is_eu: data.is_eu,
      calling_code: data.calling_code,
      country_tld: data.country_tld,
      languages: data.languages,
      country_flag: data.country_flag,
      geoname_id: data.geoname_id,
      isp: data.isp,
      connection_type: data.connection_type,
      organization: data.organization,
      currency: data.currency,
      time_zone: data.time_zone,
    };
  }

  async queryAPI(ipAddress) {
    const queryAPI = await axios.get(
      `https://api.ipgeolocation.io/ipgeo?apiKey=${ipgeolocationConf.APIKEY}&ip=${ipAddress}`,
    );
    return queryAPI.data;
  }

  async findDBIpAddress(ipAddress: string) {
    const findDBIpAddress = IpgeolocationEntity.findOne({
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
      throw new HttpException(
        { Message: 'ip adress already saved please update' },
        HttpStatus.BAD_REQUEST,
      );
    const queryAPI = await this.queryAPI(ipAddress);
    console.log(queryAPI);
    const mockData = await this.queryMock(queryAPI);
    console.log(mockData);
    const saveIP = await IpgeolocationEntity.create({ ...mockData });
    if (!saveIP)
      throw new HttpException(
        { Message: 'Error occurred while registering ip' },
        HttpStatus.BAD_REQUEST,
      );
    return saveIP;
  }

  async updateIP(ipAddress: string) {
    const findDB = await this.findDBIpAddress(ipAddress);
    if (!findDB)
      throw new HttpException(
        { Message: 'ip address not available in database please register' },
        HttpStatus.BAD_REQUEST,
      );
    const findTime = JSON.parse(JSON.stringify(findDB.time_zone));
    const isTimeOut = await this.dateTimeout(findTime.current_time);
    if (!isTimeOut) return findDB;
    const queryAPI = await this.queryAPI(ipAddress);
    const mockData = await this.queryMock(queryAPI);
    const updateDB = await IpgeolocationEntity.update(
      { ...mockData },
      { where: { ip: ipAddress } },
    );
    if (!updateDB)
      throw new HttpException(
        { Message: 'update data is error' },
        HttpStatus.BAD_REQUEST,
      );
    return { ...mockData };
  }

  async deleteIP(ipAddress: string) {
    const findDB = await this.findDBIpAddress(ipAddress);
    if (!findDB)
      throw new HttpException(
        { Message: 'ip address not found' },
        HttpStatus.BAD_REQUEST,
      );
    const removeIp = await IpgeolocationEntity.destroy({
      where: {
        ip: ipAddress,
      },
    });
    if (!removeIp)
      throw new HttpException(
        { Message: 'delete ip is error' },
        HttpStatus.BAD_REQUEST,
      );
    return { Message: 'remove is ip ' + ipAddress };
  }
}
