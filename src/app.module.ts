import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { IpgeolocationModule } from './application/modules/ipgeolocation/ipgeolocation.module';
import { DatabaseModule } from './core/modules/database/module/database.module';

@Module({
  imports: [DatabaseModule, IpgeolocationModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
