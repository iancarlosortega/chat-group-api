import { ApiProperty } from '@nestjs/swagger';
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
  @ApiProperty({
    example: '7ab55156-76cc-410a-a921-e473c53604a0',
    description: 'User ID',
    uniqueItems: true,
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    example: 'Ian Carlos Ortega',
    description: 'User name',
  })
  @Column('text')
  fullName: string;

  @ApiProperty({
    example: 'iancarlosortegaleon@gmail.com',
    description: 'User email',
    uniqueItems: true,
  })
  @Column('text', {
    unique: true,
  })
  email: string;

  @Column('text', {
    select: false,
  })
  password: string;

  @ApiProperty({
    example:
      'https://localhost:4000/dps7cc0eo/image/upload/v1700689732/hlfremyd07cz3uoxko17.jpg',
    description: 'User image',
    nullable: true,
  })
  @Column('text', {
    nullable: true,
  })
  avatarUrl?: string;

  @ApiProperty({
    example: 18,
    description: 'User age',
    nullable: true,
  })
  @Column('int', {
    nullable: true,
  })
  age?: number;

  @ApiProperty({
    example: 'Male',
    description: 'User gender',
    nullable: true,
  })
  @Column('text', {
    nullable: true,
  })
  gender?: string;

  @ApiProperty({
    example: '2001-03-25',
    description: 'User birthDate',
    nullable: true,
  })
  @Column('text', {
    nullable: true,
  })
  birthDate?: string;

  @ApiProperty({
    example: ['user', 'admin'],
    description: 'User roles',
  })
  @Column('text', {
    array: true,
    default: ['user'],
  })
  roles: string[];

  @ApiProperty({
    example: true,
    description: 'Describes if user can access to the app',
    default: true,
  })
  @Column('bool', {
    default: true,
  })
  isActive: boolean;

  @ApiProperty({
    example: '2023-11-07T14:13:03.174Z',
    description: 'When user was created',
  })
  @CreateDateColumn({ type: 'timestamp with time zone', select: false })
  createdAt: Date;

  @ApiProperty({
    example: '2023-11-07T14:13:03.174Z',
    description: 'Last time user was updated',
  })
  @UpdateDateColumn({ type: 'timestamp with time zone', select: false })
  updatedAt: Date;

  // Relations
  @OneToMany(() => Message, (message) => message.user, {
    cascade: true,
  })
  messages: Message[];
}
