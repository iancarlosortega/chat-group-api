import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Chat } from './entities/chat.entity';
import { CreateChatDto } from './dto/create-chat.dto';
import { UpdateChatDto } from './dto/update-chat.dto';
import { PaginationDto } from 'src/common/dtos/pagination.dto';

@Injectable()
export class ChatsService {
  private readonly logger = new Logger('ChatsService');

  constructor(
    @InjectRepository(Chat)
    private readonly chatRepository: Repository<Chat>,
  ) {}

  async create(createChatDto: CreateChatDto) {
    try {
      const chat = this.chatRepository.create(createChatDto);
      await this.chatRepository.save(chat);
      return chat;
    } catch (error) {
      this.handleDBExceptions(error);
    }
  }

  async findAll(paginationDto: PaginationDto) {
    const { limit = 10, offset = 0 } = paginationDto;
    const [result, totalItems] = await this.chatRepository.findAndCount({
      take: limit,
      skip: offset,
      order: {
        createdAt: 'DESC',
      },
    });

    return {
      totalItems,
      result,
    };
  }

  async findOne(id: string) {
    try {
      const chat = await this.chatRepository.findOneBy({ id });

      if (!chat) {
        throw new NotFoundException("Chat doesn't exists!");
      }

      return chat;
    } catch (error) {
      this.handleDBExceptions(error);
    }
  }

  async update(id: string, updateChatDto: UpdateChatDto) {
    const chat = await this.findOne(id);
    return this.chatRepository.save({
      ...chat,
      ...updateChatDto,
    });
  }

  async remove(id: string) {
    const chat = await this.findOne(id);
    return this.chatRepository.remove(chat);
  }

  private handleDBExceptions(error: any): never {
    this.logger.error(error);
    if (error.status === 404) {
      throw new NotFoundException(error.response.message);
    }

    if (error.code === '22P02') {
      throw new BadRequestException('ID is not valid');
    }

    console.log(error);

    throw new InternalServerErrorException(
      'Unexpected error, check server logs',
    );
  }
}
