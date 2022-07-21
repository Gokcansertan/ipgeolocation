import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { IpGeoLocationService } from '../services/ip-geo-location.service';

@Controller('ipgeolocation')
export class IpGeoLocationController {
  constructor(private readonly IpService: IpGeoLocationService) {}

  @Post()
  create(@Body('ipAddress') ipAddress: string) {
    return this.IpService.saveIP(ipAddress);
  }

  @Get()
  findAll() {
    return this.IpService.ipList();
  }
  //
  @Get(':ipAddress')
  findOne(@Param('ipAddress') ipAddress: string) {
    return this.IpService.getIpInfo(ipAddress);
  }
  //
  @Put(':ipAddress')
  update(@Param('ipAddress') ipAddress: string) {
    return this.IpService.ipUpdate(ipAddress);
  }
  //
  @Delete(':ipAddress')
  remove(@Param('ipAddress') ipAddress: string) {
    return this.IpService.removeIp(ipAddress);
  }
}
