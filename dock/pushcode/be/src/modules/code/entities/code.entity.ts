import {
  AutoIncrement,
  Column,
  CreatedAt,
  DataType,
  DeletedAt,
  Table,
  UpdatedAt,
  Model,
} from 'sequelize-typescript';

import config from '../../../../config';
@Table({
  tableName: 'code',
  schema: config.workingSchema,
  charset: 'utf8',
  collate: 'utf8_general_ci',
  paranoid: true,
  underscored: true,
})
export class Code extends Model<Code> {
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

  // @ForeignKey(() => User)
  @Column({
    type: DataType.STRING,
    field: 'value',
  })
  value: number;

  @Column({
    field: 'category',
    defaultValue: '',
  })
  category: string;

  @Column({
    allowNull: false,
    field: 'content',
  })
  content: string;

  @Column({
    field: 'desc',
    defaultValue: '',
  })
  desc: string;

  @Column({
    field: 'expire_at',
  })
  expireAt: Date;

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
