import { Module } from '@nestjs/common';
import { IpGeoLocationModule } from './modules/ipgeolocation/ip-geo-location.module';
@Module({
  imports: [IpGeoLocationModule],
  controllers: [],
  providers: [],
})
export class ApplicationModule {}
