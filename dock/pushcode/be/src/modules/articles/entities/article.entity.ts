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
} from 'sequelize-typescript';
import { User } from '../../users/entities/user.entity';
// import config from 'config';
import config from '../../../../config';

@Table({
  tableName: 'article',
  schema: config.workingSchema,
})
export class Article extends Model<Article> {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.BIGINT)
  id: number;

  @ForeignKey(() => User)
  @Column({
    type: DataType.BIGINT,
    field: 'user_id',
  })
  userId: number;

  @Length({
    min: 3,
    max: 60,
    msg: `The length of article title can't be shorter than 3 and longer than 60 `,
  })
  @Column
  title: string;

  @Column({
    type: DataType.TEXT,
  })
  content: string;

  @Column
  desc: string;

  @Column
  brief: string;

  @Column({ field: 'lede_pic' })
  ledePic: string;

  @Column({
    type: DataType.JSONB,
  })
  thumbnails: object;

  @Column({
    type: DataType.INTEGER,
  })
  words: number;

  @Column({
    type: DataType.INTEGER,
  })
  likes: number;

  @Column({
    type: DataType.JSONB,
  })
  tags: number;

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
    constraints: false,
  })
  user: User;
}
