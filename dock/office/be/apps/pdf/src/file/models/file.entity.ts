import { User } from '@pdf/user/models/user.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

@Entity('files')
export class FileEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  filename: string;

  @Column()
  originalname: string;

  @Column()
  mimetype: string;

  @Column()
  size: number;

  @Column({ nullable: true })
  description: string;

  @Column()
  path: string;

  @Column({ nullable: true })
  convertedPath: string; // Path to the converted file (new column)

  @Column({ nullable: true })
  convertedSize: number; // Size of the converted file (new column)

  @Column({ nullable: true })
  conversionStatus: string; // e.g., 'PENDING', 'COMPLETED', 'FAILED' (new column)

  @ManyToOne(() => User, { nullable: true, onDelete: 'SET NULL' })
  @JoinColumn({ name: 'user_id' })
  user?: User;

  @CreateDateColumn()
  createdAt: Date;
}
