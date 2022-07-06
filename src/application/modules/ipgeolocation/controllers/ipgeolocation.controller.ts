import { Body, Controller, Delete, Get, Param, Post, Put, Query } from "@nestjs/common";
import { IpgeolocationService } from '../services/ipgeolocation.service';
import { IpgeolocationDto } from '../models/dto/ipgeolocation.dto';

@Controller('ipgeolocation')
export class IpgeolocationController {
  constructor(private readonly IpService: IpgeolocationService) {}

  @Post()
  create(@Body('ipAddress') ipAddress: IpgeolocationDto) {
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
  update(@Param('ipAddress') ipAddress) {
    return this.IpService.ipUpdate(ipAddress);
  }
  //
  @Delete(':ipAddress')
  remove(@Param('ipAddress') ipAddress: string) {
    return this.IpService.removeIp(ipAddress);
  }
}
