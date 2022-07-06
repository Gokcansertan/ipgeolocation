import { Sequelize } from 'sequelize-typescript';
import { sequelizeConf } from './sequelize.conf';
import { IpgeolocationEntity } from '../../../../../application/modules/ipgeolocation/models/entity/ipgeolocation.entity';

export const sequelizeProviders = [
  {
    provide: 'SEQUELIZE',
    useFactory: async () => {
      const sequelize = new Sequelize({
        dialect: 'postgres',
        ...sequelizeConf,
      });
      sequelize.addModels([IpgeolocationEntity]);
      await sequelize.sync();
      return sequelize;
    },
  },
];
