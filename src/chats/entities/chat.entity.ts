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
export class Chat {
  @ApiProperty({
    example: '7ab55156-76cc-410a-a921-e473c53604a0',
    description: 'Chat ID',
    uniqueItems: true,
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    example: 'Working Chat',
    description: 'Chat name',
  })
  @Column('text')
  name: string;

  @ApiProperty({
    example:
      'In ipsum consequat ullamco velit labore reprehenderit amet id velit.',
    description: 'Chat description',
    nullable: true,
  })
  @Column('text', {
    nullable: true,
  })
  description: string;

  @ApiProperty({
    example: '2023-11-07T14:13:03.174Z',
    description: 'When chat was created',
  })
  @CreateDateColumn({ type: 'timestamp with time zone', select: false })
  createdAt: Date;

  @ApiProperty({
    example: '2023-11-07T14:13:03.174Z',
    description: 'Last time chat was updated',
  })
  @UpdateDateColumn({ type: 'timestamp with time zone', select: false })
  updatedAt: Date;

  // Relations
  @OneToMany(() => Message, (message) => message.chat, {
    cascade: true,
  })
  messages: Message[];
}
