import { Module } from '@nestjs/common';
import { IpgeolocationService } from './services/ipgeolocation.service';
import { IpgeolocationController } from './controllers/ipgeolocation.controller';

@Module({
  imports: [],
  controllers: [IpgeolocationController],
  providers: [IpgeolocationService],
})
export class IpgeolocationModule{}
