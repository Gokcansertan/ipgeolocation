import { Sequelize } from 'sequelize-typescript';
import { sequelizeConf } from './sequelize.conf';
import { ipgeolocationEntity } from '../../../../../application/modules/ipgeolocation/models/entity/ipgeolocation.entity';

export const sequelizeProviders = [
  {
    provide: 'SEQUELIZE',
    useFactory: async () => {
      const sequelize = new Sequelize({
        dialect: 'postgres',
        ...sequelizeConf,
      });
      sequelize.addModels([ipgeolocationEntity]);
      await sequelize.sync();
      return sequelize;
    },
  },
];
