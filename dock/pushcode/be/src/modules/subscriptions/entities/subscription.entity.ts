import { User } from 'src/modules/users/entities/user.entity';
import config from '../../../../config';
import {
  AutoIncrement,
  BelongsToMany,
  Column,
  CreatedAt,
  DataType,
  DeletedAt,
  Model,
  Table,
  UpdatedAt,
} from 'sequelize-typescript';
import { UserSubscription } from './user-subscription.entity';

@Table({
  tableName: 'subscription',
  schema: config.workingSchema,
  charset: 'utf8',
  collate: 'utf8_general_ci',
  paranoid: true,
  underscored: true,
})
export class Subscription extends Model<Subscription> {
  @AutoIncrement
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
  })
  id: number;

  @Column({
    unique: true,
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
  })
  uuid: string;

  @Column({
    field: 'name',
    allowNull: false,
    defaultValue: '',
  })
  name: string;

  @Column({
    field: 'title',
    allowNull: false,
    defaultValue: '',
  })
  title: string;

  @Column({
    field: 'timer',
    allowNull: false,
    type: DataType.DOUBLE,
    defaultValue: 0,
  })
  timer: number;

  @Column({
    field: 'amount',
    allowNull: false,
    type: DataType.INTEGER,
    defaultValue: 0,
  })
  amount: number;

  @Column
  desc: string;

  @Column({
    type: DataType.STRING,
  })
  price: string;

  @Column({
    field: 'discounted_price',
    allowNull: false,
    type: DataType.STRING,
    defaultValue: '',
  })
  discountedPrice: string;

  @Column({
    field: 'plan',
    allowNull: false,
    type: DataType.STRING,
    defaultValue: '',
  })
  plan: string;

  @Column({
    field: 'expired_at',
  })
  expiredAt: Date;

  @CreatedAt
  @Column({ field: 'created_at' })
  createdAt: Date;

  @UpdatedAt
  @Column({ field: 'updated_at' })
  updatedAt: Date;

  @DeletedAt
  @Column({ field: 'deleted_at' })
  deletedAt: Date;

  @BelongsToMany(() => User, {
    through: {
      model: () => UserSubscription,
      unique: false,
    },
    foreignKey: 'subscriptionId',
    constraints: false,
  })
  users!: User[];
}
