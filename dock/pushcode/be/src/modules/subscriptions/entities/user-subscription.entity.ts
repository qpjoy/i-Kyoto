import { User } from 'src/modules/users/entities/user.entity';
import config from '../../../../config';
import {
  AfterCreate,
  AutoIncrement,
  BeforeCreate,
  BelongsToMany,
  Column,
  CreatedAt,
  DataType,
  DeletedAt,
  ForeignKey,
  Model,
  Table,
  UpdatedAt,
} from 'sequelize-typescript';
import { Subscription } from './subscription.entity';
import * as dayjs from 'dayjs';

@Table({
  tableName: 'user_subscription',
  schema: config.workingSchema,
  charset: 'utf8',
  collate: 'utf8_general_ci',
  paranoid: true,
  underscored: true,
})
export class UserSubscription extends Model<UserSubscription> {
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

  @ForeignKey(() => User)
  @Column(DataType.INTEGER)
  userId!: number;

  @ForeignKey(() => Subscription)
  @Column(DataType.INTEGER)
  subscriptionId!: number;

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

  @Column
  desc: string;

  @Column({
    field: 'expired_at',
  })
  expiredAt: Date;

  @Column({
    field: 'subscript_at',
  })
  subscriptAt: Date;

  @CreatedAt
  @Column({ field: 'created_at' })
  createdAt: Date;

  @UpdatedAt
  @Column({ field: 'updated_at' })
  updatedAt: Date;

  @DeletedAt
  @Column({ field: 'deleted_at' })
  deletedAt: Date;
}
