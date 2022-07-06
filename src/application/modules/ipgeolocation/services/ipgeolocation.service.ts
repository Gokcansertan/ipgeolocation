import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ipgeolocationConf } from '../models/conf/ipgeolocationConf';
import { IpGeoLocation } from '../../../../core/utils/ip-geo-location';
import { IpgeolocationEntity } from '../models/entity/ipgeolocation.entity';

@Injectable()
export class IpgeolocationService extends IpGeoLocation {
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
    const ipAllList = await IpgeolocationEntity.findAll();
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
