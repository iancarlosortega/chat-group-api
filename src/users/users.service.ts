import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PaginationDto } from 'src/common/dtos/pagination.dto';

@Injectable()
export class UsersService {
  private readonly logger = new Logger('UsersService');

  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async findAll(paginationDto: PaginationDto) {
    const { limit = 10, offset = 0 } = paginationDto;
    const [result, totalItems] = await this.userRepository.findAndCount({
      take: limit,
      skip: offset,
    });

    return {
      totalItems,
      result,
    };
  }

  async findOne(id: string) {
    try {
      const user = await this.userRepository.findOneBy({ id });

      if (!user) {
        throw new NotFoundException("User doesn't exists!");
      }

      return user;
    } catch (error) {
      this.handleDBExceptions(error);
    }
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.findOne(id);
    return this.userRepository.save({
      ...user,
      ...updateUserDto,
    });
  }

  async remove(id: string) {
    const user = await this.findOne(id);
    return this.userRepository.remove(user);
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
