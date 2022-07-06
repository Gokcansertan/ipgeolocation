import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ApplicationModule } from './application/application.module';
import { CoreModule } from './core/core.module';

@Module({
  imports: [CoreModule, ApplicationModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
