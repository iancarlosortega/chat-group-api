import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChatsService } from './chats.service';
import { ChatsController } from './chats.controller';
import { Chat } from './entities/chat.entity';

@Module({
  controllers: [ChatsController],
  providers: [ChatsService],
  imports: [TypeOrmModule.forFeature([Chat])],
  exports: [ChatsService],
})
export class ChatsModule {}
