import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  Generated,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('codes')
export class Code {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Generated('uuid')
  uuid: string;

  @Column({ nullable: true })
  value?: string;

  @Column({ default: '' })
  category?: string;

  @Column({ nullable: false })
  content: string;

  @Column({ default: '' })
  desc: string;

  @Column()
  expireAt: Date;

  @CreateDateColumn({ name: 'created_at' }) // auto set on insert
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' }) // auto set on update
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at' }) // used for soft delete
  deletedAt: Date;
}
