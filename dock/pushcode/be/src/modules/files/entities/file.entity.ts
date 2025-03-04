import {
  Table,
  PrimaryKey,
  AutoIncrement,
  Column,
  DataType,
  Model,
  ForeignKey,
  Unique,
  Length,
  CreatedAt,
  UpdatedAt,
  DeletedAt,
  BelongsTo,
  Index,
} from 'sequelize-typescript';
import config from '../../../../config';
import { User } from 'src/modules/users/entities/user.entity';

@Table({
  tableName: 'file',
  schema: config.workingSchema,
})
export class File extends Model<File> {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.BIGINT)
  id: number;

  @Index({ unique: true, name: 'qp_memento_file' })
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
  })
  uuid: string;

  @ForeignKey(() => User)
  @Column({
    type: DataType.BIGINT,
    field: 'user_id',
  })
  userId: number;

  @Column
  name: string;

  @Column
  desc: string;

  @Column
  hashed_name: string;

  @Column
  original_name: string;

  @Column({
    type: DataType.BIGINT,
  })
  size: number;

  @Column
  content_type: string;

  @Column({
    type: DataType.TEXT,
  })
  content: string;

  @Index({ unique: true, name: 'qp_exam_cos_url' })
  @Column
  url: string;

  // local or oss
  @Column
  mode: string;

  // is uploaded
  @Column
  status: string;

  @Column(DataType.JSONB)
  properties: object;

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
