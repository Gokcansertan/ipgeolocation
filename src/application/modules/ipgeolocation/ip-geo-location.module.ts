import { Module } from '@nestjs/common';
import { IpGeoLocationService } from './services/ip-geo-location.service';
import { IpGeoLocationController } from './controllers/ip-geo-location.controller';

@Module({
  imports: [],
  controllers: [IpGeoLocationController],
  providers: [IpGeoLocationService],
})
export class IpGeoLocationModule {}
