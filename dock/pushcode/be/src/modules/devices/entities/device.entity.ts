import {
  Table,
  Model,
  AutoIncrement,
  Column,
  DataType,
  ForeignKey,
  CreatedAt,
  UpdatedAt,
  DeletedAt,
  BelongsTo,
} from 'sequelize-typescript';
import config from '../../../../config';
import { User } from 'src/modules/users/entities/user.entity';

@Table({
  tableName: 'device',
  schema: config.workingSchema,
  charset: 'utf8',
  collate: 'utf8_general_ci',
  paranoid: true,
  underscored: true,
})
export class Device extends Model<Device> {
  [x: string]: any;
  @AutoIncrement
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
  })
  id: number;

  @ForeignKey(() => User)
  @Column({
    type: DataType.BIGINT,
    field: 'user_id',
  })
  userId: number;

  @Column({
    unique: true,
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
  })
  uuid: string;

  @Column({
    field: 'name',
    defaultValue: '',
  })
  name: string;

  @Column({
    field: 'content',
    defaultValue: '',
  })
  content: string;

  @Column({
    field: 'desc',
    defaultValue: '',
  })
  desc: string;

  @CreatedAt
  @Column({ field: 'created_at' })
  createdAt: Date;

  @UpdatedAt
  @Column({ field: 'updated_at' })
  updatedAt: Date;

  @DeletedAt
  @Column({ field: 'deleted_at' })
  deletedAt: Date;

  @BelongsTo(() => User, {
    foreignKey: 'userId',
    constraints: false,
  })
  user: User;
}
