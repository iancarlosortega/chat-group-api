import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { ChatsService } from './chats.service';
import { Chat } from './entities/chat.entity';
import { CreateChatDto } from './dto/create-chat.dto';
import { UpdateChatDto } from './dto/update-chat.dto';
import { SearchChatDto } from './dto/search-chat.dto';
import { PaginationDto } from 'src/common/dtos/pagination.dto';

@ApiTags('Chats')
@Controller('chats')
export class ChatsController {
  constructor(private readonly chatsService: ChatsService) {}

  @Post()
  @ApiResponse({
    status: '2XX',
    description: 'Chat created succesfully',
    type: Chat,
  })
  @ApiResponse({ status: '4XX', description: 'Invalid request data body' })
  create(@Body() createChatDto: CreateChatDto) {
    return this.chatsService.create(createChatDto);
  }

  @Get()
  @ApiResponse({
    status: '2XX',
    description: 'List of all chats paginated',
    isArray: true,
    type: Chat,
  })
  findAll(@Query() paginationDto: PaginationDto) {
    return this.chatsService.findAll(paginationDto);
  }

  @Get('search')
  @ApiResponse({
    status: '2XX',
    description: 'List of all chats by a search term',
    isArray: true,
    type: Chat,
  })
  findBySearchTerm(@Query() searchChatDto: SearchChatDto) {
    return this.chatsService.findBySearchTerm(searchChatDto);
  }

  @Get(':id')
  @ApiResponse({
    status: '2XX',
    description: 'Chat found by ID',
    type: Chat,
  })
  @ApiResponse({
    status: '4XX',
    description: 'Chat was not found or invalid ID',
  })
  findOne(@Param('id') id: string) {
    return this.chatsService.findOne(id);
  }

  @Patch(':id')
  @ApiResponse({
    status: '2XX',
    description: 'Chat updated succesfully',
    type: Chat,
  })
  @ApiResponse({
    status: '4XX',
    description: 'Chat was not found or invalid ID',
  })
  update(@Param('id') id: string, @Body() updateChatDto: UpdateChatDto) {
    return this.chatsService.update(id, updateChatDto);
  }

  @Delete(':id')
  @ApiResponse({
    status: '2XX',
    description: 'Chat deleted succesfully',
  })
  @ApiResponse({
    status: '4XX',
    description: 'Chat was not found or invalid ID',
  })
  remove(@Param('id') id: string) {
    return this.chatsService.remove(id);
  }
}
