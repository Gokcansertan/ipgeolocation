import { Sequelize } from 'sequelize-typescript';
import { sequelizeConf } from './sequelize.conf';
import { IpGeoLocationEntity } from '../../../../application/modules/ipgeolocation/models/entity/ip-geo-location.entity';

export const sequelizeProviders = [
  {
    provide: 'SEQUELIZE',
    useFactory: async () => {
      const sequelize = new Sequelize({
        dialect: 'postgres',
        ...sequelizeConf,
      });
      sequelize.addModels([IpGeoLocationEntity]);
      await sequelize.sync();
      return sequelize;
    },
  },
];
