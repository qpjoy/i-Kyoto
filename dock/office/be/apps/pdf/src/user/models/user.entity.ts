import {
  Column,
  Entity,
  Generated,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Exclude } from 'class-transformer';
import { Role } from '../../role/models/role.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Generated('uuid')
  uuid: string;

  @Column({ nullable: true })
  first_name?: string;

  @Column({ nullable: true })
  last_name?: string;

  @Column({ nullable: true })
  gender?: string;

  @Column({ nullable: true })
  hobbies?: string;

  @Column({ nullable: true })
  birthday?: string;

  @Column({ unique: true })
  email: string;

  @Column()
  // @Exclude()
  password: string;

  @Column({
    default: '',
  })
  full_name: string;

  @ManyToOne(() => Role)
  @JoinColumn({ name: 'role_id' })
  role: Role;
}
