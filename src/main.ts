import * as path from 'path';
import { ConfigModule } from '@nestjs/config';

(async () => {
  const rootfolder = path.join(__dirname, '../');

  await ConfigModule.forRoot({
    envFilePath: path.join(rootfolder, 'environment', '.env.dev'),
  });

  require('./server');
})();
