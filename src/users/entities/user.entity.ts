import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Message } from 'src/messages/entities/message.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text')
  fullName: string;

  @Column('text', {
    unique: true,
  })
  email: string;

  @Column('text', {
    select: false,
  })
  password: string;

  @Column('text', {
    nullable: true,
  })
  avatarUrl?: string;

  @Column('int', {
    nullable: true,
  })
  age?: number;

  @Column('text', {
    nullable: true,
  })
  gender?: string;

  @Column('text', {
    nullable: true,
  })
  birthDate?: string;

  @Column('text', {
    array: true,
    default: ['user'],
  })
  roles: string[];

  @Column('bool', {
    default: true,
  })
  isActive: boolean;

  @CreateDateColumn({ type: 'timestamp with time zone', select: false })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp with time zone', select: false })
  updatedAt: Date;

  // Relations

  @OneToMany(() => Message, (message) => message.user, {
    cascade: true,
  })
  messages: Message[];
}
