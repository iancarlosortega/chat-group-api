import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Chat } from 'src/chats/entities/chat.entity';
import { User } from 'src/users/entities/user.entity';

@Entity()
export class Message {
  @ApiProperty({
    example: '7ab55156-76cc-410a-a921-e473c53604a0',
    description: 'Message ID',
    uniqueItems: true,
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    example:
      'Enim ea eiusmod nostrud Lorem aute consequat et laborum deserunt et qui.',
    description: 'Message content',
    minLength: 1,
  })
  @Column('text')
  content: string;

  @ApiProperty({
    example: '2023-11-07T14:13:03.174Z',
    description: 'When message was created',
  })
  @CreateDateColumn({
    type: 'timestamp with time zone',
  })
  createdAt: Date;

  @ApiProperty({
    example: '2023-11-07T14:13:03.174Z',
    description: 'Last time when message was created',
  })
  @UpdateDateColumn({ type: 'timestamp with time zone', select: false })
  updatedAt: Date;

  // Relations

  @ManyToOne(() => User, (user) => user.messages)
  user: User;

  @ManyToOne(() => Chat, (chat) => chat.messages)
  chat: Chat;
}
