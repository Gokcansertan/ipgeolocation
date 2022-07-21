import { Module } from '@nestjs/common';
import { SequelizeModule } from './sequelize/sequelize.module';

@Module({
  imports: [SequelizeModule],
  controllers: [],
  exports: [SequelizeModule],
})
export class DatabaseModule {}
