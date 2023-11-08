import {
  Controller,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Get,
  Query,
} from '@nestjs/common';
import { MessagesService } from './messages.service';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { GetUser } from 'src/auth/decorators/get-user.decorator';
import { User } from 'src/users/entities/user.entity';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { PaginationDto } from 'src/common/dtos/pagination.dto';

@Controller('messages')
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) {}

  @Post()
  @Auth()
  create(@Body() createMessageDto: CreateMessageDto, @GetUser() user: User) {
    return this.messagesService.create(createMessageDto, user);
  }

  @Get(':id')
  findByChatRoom(
    @Param('id') chatId: string,
    @Query() paginationDto: PaginationDto,
  ) {
    return this.messagesService.findByChatRoom(chatId, paginationDto);
  }

  @Patch(':id')
  @Auth()
  update(
    @Param('id') id: string,
    @Body() updateMessageDto: UpdateMessageDto,
    @GetUser() user: User,
  ) {
    return this.messagesService.update(id, updateMessageDto, user);
  }

  @Delete(':id')
  @Auth()
  remove(@Param('id') id: string) {
    return this.messagesService.remove(id);
  }
}
