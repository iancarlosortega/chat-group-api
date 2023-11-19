import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { ChatsService } from './chats.service';
import { ChatsController } from './chats.controller';
import { ChatsGateway } from './chats.gateway';
import { Chat } from './entities/chat.entity';

@Module({
  controllers: [ChatsController],
  providers: [ChatsService, ChatsGateway],
  imports: [TypeOrmModule.forFeature([Chat]), AuthModule],
  exports: [ChatsService],
})
export class ChatsModule {}
