import config from '../../../../config';
import {
  AutoIncrement,
  Column,
  CreatedAt,
  DataType,
  DeletedAt,
  Model,
  Table,
  UpdatedAt,
} from 'sequelize-typescript';

@Table({
  tableName: 'message',
  schema: config.workingSchema,
  charset: 'utf8',
  collate: 'utf8_general_ci',
  paranoid: true,
  underscored: true,
})
export class Message extends Model<Message> {
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
    field: 'content',
    allowNull: false,
    defaultValue: '',
  })
  content: string;

  @Column({
    field: 'url',
    allowNull: false,
    defaultValue: '',
  })
  url: string;

  @Column
  desc: string;

  @Column({
    field: 'type',
    allowNull: false,
    defaultValue: '',
  })
  type: string;

  @Column({
    field: 'is_active',
    allowNull: false,
    type: DataType.BOOLEAN,
    defaultValue: false,
  })
  isActive: boolean;

  @Column(DataType.JSONB)
  others: object;

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
