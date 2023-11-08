import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityNotFoundError, Repository } from 'typeorm';
import { ChatsService } from './../chats/chats.service';
import { Message } from './entities/message.entity';
import { User } from 'src/users/entities/user.entity';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { PaginationDto } from 'src/common/dtos/pagination.dto';

@Injectable()
export class MessagesService {
  private readonly logger = new Logger('MesssagesService');

  constructor(
    @InjectRepository(Message)
    private readonly messageRepository: Repository<Message>,
    private readonly chatsService: ChatsService,
  ) {}

  async create(createMessageDto: CreateMessageDto, user: User) {
    const { chatId, ...messageData } = createMessageDto;

    const chat = await this.chatsService.findOne(chatId);

    try {
      const message = this.messageRepository.create({
        ...messageData,
        user,
        chat,
      });
      await this.messageRepository.save(message);
      return {
        ok: true,
        response: {
          message: 'Message created succesfully!',
        },
      };
    } catch (error) {
      this.handleDBExceptions(error);
    }
  }

  async findOne(id: string) {
    try {
      const message = await this.messageRepository.findOneBy({ id });

      if (!message) {
        throw new NotFoundException("Message doesn't exists!");
      }

      return message;
    } catch (error) {
      this.handleDBExceptions(error);
    }
  }

  async findByChatRoom(chatId: string, paginationDto: PaginationDto) {
    const { limit = 15, offset = 0 } = paginationDto;
    await this.chatsService.findOne(chatId);
    const [result, totalItems] = await this.messageRepository.findAndCount({
      take: limit,
      skip: offset,
      relations: {
        user: true,
      },
      where: {
        chat: {
          id: chatId,
        },
      },
      order: {
        createdAt: 'DESC',
      },
    });
    return {
      result,
      totalItems,
    };
  }

  async update(id: string, updateMessageDto: UpdateMessageDto, user: User) {
    const message = await this.findOne(id);
    const { chatId, ...messageData } = updateMessageDto;
    const updatedMessage = {
      ...message,
      ...messageData,
      user,
    };

    if (chatId) {
      const chat = await this.chatsService.findOne(chatId);
      updatedMessage.chat = chat;
    }

    await this.messageRepository.save(updatedMessage);

    return {
      ok: true,
      response: {
        message: `Message with id: #${id} updated succesfully`,
      },
    };
  }

  async remove(id: string) {
    const message = await this.findOne(id);
    await this.messageRepository.remove(message);
    return {
      ok: true,
      response: {
        message: `Message with id #${id} removed succesfully`,
      },
    };
  }

  private handleDBExceptions(error: any): never {
    this.logger.error(error);
    if (error.status === 404) {
      throw new NotFoundException(error.response.message);
    }

    if (error.code === '22P02') {
      throw new BadRequestException('ID is not valid');
    }

    if (error.constructor === EntityNotFoundError) {
      throw new NotFoundException("Chat with that ID doesn't exists");
    }

    console.log(error);

    throw new InternalServerErrorException(
      'Unexpected error, check server logs',
    );
  }
}
