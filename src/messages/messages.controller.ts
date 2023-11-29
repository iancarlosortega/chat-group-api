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
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { MessagesService } from './messages.service';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { GetUser } from 'src/auth/decorators/get-user.decorator';
import { User } from 'src/users/entities/user.entity';
import { Message } from './entities/message.entity';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { PaginationDto } from 'src/common/dtos/pagination.dto';

@ApiTags('Messages')
@Controller('messages')
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) {}

  @Post()
  @Auth()
  @ApiResponse({
    status: '2XX',
    description: 'Message created succesfully',
    type: Message,
  })
  @ApiResponse({ status: '4XX', description: 'Invalid request data body' })
  create(@Body() createMessageDto: CreateMessageDto, @GetUser() user: User) {
    return this.messagesService.create(createMessageDto, user);
  }

  @Get(':id')
  @ApiResponse({
    status: '2XX',
    description: 'List of all messages paginated',
    isArray: true,
    type: Message,
  })
  findByChatRoom(
    @Param('id') chatId: string,
    @Query() paginationDto: PaginationDto,
  ) {
    return this.messagesService.findByChatRoom(chatId, paginationDto);
  }

  @Patch(':id')
  @Auth()
  @ApiResponse({
    status: '2XX',
    description: 'Message updated succesfully',
    type: Message,
  })
  @ApiResponse({
    status: '4XX',
    description: 'Message was not found or invalid ID',
  })
  update(
    @Param('id') id: string,
    @Body() updateMessageDto: UpdateMessageDto,
    @GetUser() user: User,
  ) {
    return this.messagesService.update(id, updateMessageDto, user);
  }

  @Delete(':id')
  @Auth()
  @ApiResponse({
    status: '2XX',
    description: 'Message deleted succesfully',
  })
  @ApiResponse({
    status: '4XX',
    description: 'Message was not found or invalid ID',
  })
  remove(@Param('id') id: string) {
    return this.messagesService.remove(id);
  }
}
