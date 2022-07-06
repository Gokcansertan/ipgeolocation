import { Module } from '@nestjs/common';
import { DatabaseModule } from './modules/database/module/database.module';
@Module({
  imports: [DatabaseModule],
  controllers: [],
  providers: [],
})
export class CoreModule {}
