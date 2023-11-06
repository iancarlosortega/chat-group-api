import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { MessagesService } from './messages.service';
import { MessagesController } from './messages.controller';
import { Message } from './entities/message.entity';
import { ChatsModule } from 'src/chats/chats.module';

@Module({
  controllers: [MessagesController],
  providers: [MessagesService],
  imports: [AuthModule, ChatsModule, TypeOrmModule.forFeature([Message])],
})
export class MessagesModule {}
