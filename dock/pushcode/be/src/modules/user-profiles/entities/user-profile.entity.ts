import {
  Table,
  Column,
  Model,
  Unique,
  IsEmail,
  DataType,
  CreatedAt,
  UpdatedAt,
  DeletedAt,
  HasMany,
  AllowNull,
  AutoIncrement,
  Index,
  ForeignKey,
} from 'sequelize-typescript';
import config from '../../../../config';
import { User } from 'src/modules/users/entities/user.entity';

@Table({
  tableName: 'user_profile',
  schema: config.workingSchema,
})
export class UserProfile extends Model<UserProfile> {
  @AutoIncrement
  @Column({
    type: DataType.BIGINT,
    primaryKey: true,
  })
  id: number;

  @ForeignKey(() => User) // Define the foreign key relationship
  @Column({ type: DataType.BIGINT, allowNull: false, field: 'user_id' })
  userId: number;

  @Column({ type: DataType.STRING, allowNull: true })
  avatar: string;

  @Column({ type: DataType.STRING, allowNull: true })
  company: string;

  @Column({ type: DataType.STRING, allowNull: true })
  address: string;

  @Column({ type: DataType.STRING, allowNull: true })
  education: string;

  @Column({ type: DataType.STRING, allowNull: true })
  title: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  mood: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })
  records: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })
  words: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })
  likes: number;

  @Column({
    type: DataType.JSONB,
    allowNull: true,
  })
  others: object;
}
