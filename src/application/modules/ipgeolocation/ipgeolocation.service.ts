import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import axios from 'axios';
import { ipgeolocationConf } from './models/conf/ipgeolocationConf';
import { ipgeolocationEntity } from './models/entity/ipgeolocation.entity';

@Injectable()
export class IpgeolocationService {
  async dateTimeout(createdAt, timeoutDate = 30) {
    const createdAtTimeOut =
      createdAt.getTime() + 1000 * 60 * 60 * 24 * timeoutDate;
    const nowTime = Date.now();
    const dateTimeOutControl = nowTime > createdAtTimeOut ? true : false;
    return dateTimeOutControl;
  }

  async queryProcess(process, resultAPI, ipAddress) {
    const queryData = {
      ip: resultAPI.ip,
      continent_code: resultAPI.continent_code,
      continent_name: resultAPI.continent_name,
      country_code2: resultAPI.country_code2,
      country_code3: resultAPI.country_code2,
      country_name: resultAPI.country_name,
      country_capital: resultAPI.country_capital,
      state_prov: resultAPI.state_prov,
      district: resultAPI.district,
      city: resultAPI.city,
      zipcode: resultAPI.zipcode,
      latitude: resultAPI.latitude,
      longitude: resultAPI.longitude,
      is_eu: resultAPI.is_eu,
      calling_code: resultAPI.calling_code,
      country_tld: resultAPI.country_tld,
      languages: resultAPI.languages,
      country_flag: resultAPI.country_flag,
      geoname_id: resultAPI.geoname_id,
      isp: resultAPI.isp,
      connection_type: resultAPI.connection_type,
      organization: resultAPI.organization,
    };

    if (process === 'register') {
      const queryProcess = await ipgeolocationEntity.create({
        ...queryData,
        raw: true,
      });

      if (!queryProcess)
        throw new HttpException(
          { message: 'Error occurred while saving ip' },
          HttpStatus.BAD_REQUEST,
        );

      return { message: 'Ip saved successfully', ...queryData };
    }
    if (process === 'update') {
      const queryProcess = await ipgeolocationEntity.update(
        {
          ...queryData,
        },
        {
          where: {
            ip: ipAddress,
          },
        },
      );
      console.log(queryProcess);
      if (!queryProcess)
        throw new HttpException(
          { message: 'Error occurred while updating' },
          HttpStatus.BAD_REQUEST,
        );

      return { message: 'Query update successful', ...queryData };
    }
  }

  async getInfoAddress(body) {
    const dbResult = await ipgeolocationEntity.findOne({
      limit: 1,
      where: {
        ip: body.ipAddress,
      },
      raw: true,
      order: [['createdAt', 'DESC']],
    });

    if (!dbResult) {
      const resultAPI = await axios.get(
        `https://api.ipgeolocation.io/ipgeo?apiKey=${ipgeolocationConf.APIKEY}&ip=${body.ipAddress}`,
      );
      const result = await this.queryProcess(
        'register',
        resultAPI.data,
        body.ipAddress,
      );
      return result;
    }

    const queryTimeOut = await this.dateTimeout(dbResult.createdAt);
    if (queryTimeOut == false) return dbResult;
    const resultAPI = await axios.get(
      `https://api.ipgeolocation.io/ipgeo?apiKey=${ipgeolocationConf.APIKEY}&ip=${body.ipAddress}`,
    );

    const result = await this.queryProcess('update', resultAPI, body.ipAddress);
    return result;
  }
}
