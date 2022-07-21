import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { IpGeoLocation } from '../../../../core/helpers/ip-geo-location';
import { IpGeoLocationEntity } from '../models/entity/ip-geo-location.entity';
import { ipGeoLocationConf } from '../models/conf/ip-geo-location-conf';

@Injectable()
export class IpGeoLocationService extends IpGeoLocation {
  //TODO: modify core file transfer

  async saveIP(ipAddress) {
    const regIP = await this.registerIP(ipAddress);
    return regIP;
  }

  async ipUpdate(ipAddress) {
    const updateIP = await this.updateIP(ipAddress);
    return updateIP;
  }

  async ipList() {
    const ipAllList = await IpGeoLocationEntity.findAll();
    return ipAllList;
  }

  async getIpInfo(ipAddress) {
    const getIp = await this.findDBIpAddress(ipAddress);
    if (!getIp)
      throw new HttpException(
        { Message: 'ip not found' },
        HttpStatus.BAD_REQUEST,
      );
    return getIp;
  }

  async removeIp(ipAddress) {
    const deleteIp = await this.deleteIP(ipAddress);
    return deleteIp;
  }
}
