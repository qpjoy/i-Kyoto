import { DataSourceOptions } from 'typeorm';
import { User } from '../../user/models/user.entity';
import { Role } from '../../role/models/role.entity';
import { Permission } from '../../permission/models/permission.entity';
import { AuthModule } from '../../auth/auth.module';
import { RoleModule } from '../../role/role.module';
import { PermissionModule } from '../../permission/permission.module';
import { ProductModule } from '../../product/product.module';
import { OrderModule } from '../../order/order.module';
import { UserModule } from '../../user/user.module';
import { CodeModule } from '../../code/code.module';
import { Product } from '@pdf/product/models/product.entity';
import { Order } from '@pdf/order/models/order.entity';
import { OrderItem } from '@pdf/order/models/order-item.entity';
import { Code } from '@pdf/code/models/code.entity';
import { FileEntity } from '@pdf/file/models/file.entity';

const ormConfig = (): DataSourceOptions => ({
  type: 'postgres',
  host:
    process.env.NODE_ENV === 'host' ? 'localhost' : process.env.DB_HOST || 'db',
  port: parseInt(process.env.DB_PORT || '5432'),
  username: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASS || 'postgres',
  database: process.env.DB_NAME || 'pdf',
  // TypeOrmModule autoLoadEntities: true,
  synchronize: true,
  logging: true,
  entities: [
    User,
    Role,
    Permission,
    Product,
    Order,
    OrderItem,
    Code,
    FileEntity,
  ],
  migrations: ['dist/database/migrations/*.js'],
  migrationsTableName: 'typeorm_migrations',
});

export default ormConfig;
