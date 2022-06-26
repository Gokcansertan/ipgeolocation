import { Module } from '@nestjs/common';
import { IpgeolocationService } from './ipgeolocation.service';
import { IpgeolocationController } from './ipgeolocation.controller';

@Module({
  imports: [],
  controllers: [IpgeolocationController],
  providers: [IpgeolocationService],
})
export class IpgeolocationModule{}
