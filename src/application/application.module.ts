import { Module } from '@nestjs/common';
import { IpgeolocationModule } from './modules/ipgeolocation/ipgeolocation.module';
@Module({
  imports: [IpgeolocationModule],
  controllers: [],
  providers: [],
})
export class ApplicationModule {}
