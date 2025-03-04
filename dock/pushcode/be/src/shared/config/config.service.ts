import { Injectable } from '@nestjs/common';
import config from '../../../config';

@Injectable()
export class ConfigService {
  get sequelizeOrmConfig(): any {
    return config.database;
  }

  get jwtConfig() {
    return { privateKey: config.jwtPrivateKey };
  }

  get initSchemas() {
    return config.initSchemas;
  }

  get workingSchema() {
    return config.workingSchema;
  }

  get redis() {
    return config.redis;
  }
}
