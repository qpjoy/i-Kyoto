import { Sequelize } from 'sequelize-typescript';
import { User } from '../users/entities/user.entity';
import { UserProfile } from '../user-profiles/entities/user-profile.entity';
import { Article } from '../articles/entities/article.entity';
import { File } from '../files/entities/file.entity';
import { Code } from '../code/entities/code.entity';
import { Help } from '../helps/entities/help.entity';
import { Message } from '../messages/entities/messages.entity';
import { Device } from '../devices/entities/device.entity';
import { Subscription } from '../subscriptions/entities/subscription.entity';
import { UserSubscription } from '../subscriptions/entities/user-subscription.entity';

import { ConfigService } from '../../shared/config/config.service';

import * as _ from 'lodash';
import * as color from 'chalk';

// Sequelize.prototype.query = function () {
//   return originalQuery.apply(this, arguments).catch(function (err) {
//     // log the error

//     throw err;
//   });
// };

export const databaseProviders = [
  {
    provide: 'SEQUELIZE',
    useFactory: async (configService: ConfigService) => {
      // first sequelize create initSchema
      let sequelize = null;
      let _sequelize = null;

      console.log('init db');
      const database = configService.sequelizeOrmConfig.database;
      _sequelize = new Sequelize({
        ...configService.sequelizeOrmConfig,
        database: 'postgres',
      });
      // INFO: workaround with CREATE DATABASE IF NOT EXISTS
      // await _sequelize.getQueryInterface().createDatabase(database, {
      //   encoding: 'UTF8',
      // });
      // `CREATE DATABASE ${database} ENCODING "UTF8" LC_COLLATE = "en_US.UTF-8" LC_CTYPE = "en_US.UTF-8";
      const query = `SELECT 1 FROM pg_database WHERE datname = '${database}'`;
      const [result, metadata] = await _sequelize.query(query);

      if (metadata.rowCount === 0) {
        color.yellow(
          `[Database]:  NOT EXISTS, creating database ${database}...`,
        );
        const createQuery = `CREATE DATABASE "${database}" ENCODING "UTF8"`;
        await _sequelize.query(createQuery);

        color.green(`Database "${database}" created successfully.`);
      } else {
        color.green(`Database "${database}" exists.`);
      }

      // await _sequelize.sync({
      //   force: true,
      //   // schema: 'nest_dev',
      // });
      _sequelize = null;
      sequelize = new Sequelize(configService.sequelizeOrmConfig);

      // make sure the DBs r created!
      await sequelize.authenticate();

      const existSchemas: any = await sequelize.showAllSchemas({
        logging: false,
      });
      const differeces = _(configService.initSchemas)
        .chain()
        .difference(existSchemas)
        .compact()
        .value();
      console.log(differeces, 'Need to be created!');

      await Promise.all(
        differeces.reduce((acc, cur, idx) => {
          acc.push(
            sequelize
              .createSchema(cur, { logging: console.log })
              .catch((err) => err),
          );
          return acc;
        }, []) as any,
      )
        .then(async (arrayOfValuesOrErrors) => {
          arrayOfValuesOrErrors.forEach((cur, idx) => {
            console.log(
              color.green(`[Schema]: ${differeces[idx]} initialized!`),
            );
          });
        })
        .catch((err) => {
          console.log(color.red(`[Schema]: init error`, err.message));
        })
        .finally(async () => {
          sequelize = new Sequelize(configService.sequelizeOrmConfig);
          sequelize.addModels([
            User,
            UserProfile,
            Article,
            File,
            Code,
            Help,
            Message,
            Device,
            Subscription,
            UserSubscription,
          ]);
        });
      // await File.sync({
      //   alter: true,
      // });
      // await File.sync({
      //   alter: true,
      // });
      await sequelize.sync({
        // schema: config.workingSchema,
        // force: true,
      });
      return sequelize;
    },
    inject: [ConfigService],
  },
];
