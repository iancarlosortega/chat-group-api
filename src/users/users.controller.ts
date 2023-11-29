import {
  Controller,
  Get,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { UpdateUserDto } from './dto/update-user.dto';
import { PaginationDto } from 'src/common/dtos/pagination.dto';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @ApiResponse({
    status: '2XX',
    description: 'List of all users paginated',
    isArray: true,
    type: User,
  })
  findAll(@Query() paginationDto: PaginationDto) {
    return this.usersService.findAll(paginationDto);
  }

  @Get(':id')
  @ApiResponse({
    status: '2XX',
    description: 'User found by ID',
    type: User,
  })
  @ApiResponse({
    status: '4XX',
    description: 'User was not found or invalid ID',
  })
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @Patch(':id')
  @ApiResponse({
    status: '2XX',
    description: 'User updated succesfully',
    type: User,
  })
  @ApiResponse({
    status: '4XX',
    description: 'User was not found or invalid ID',
  })
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  @ApiResponse({
    status: '2XX',
    description: 'User deleted succesfully',
  })
  @ApiResponse({
    status: '4XX',
    description: 'User was not found or invalid ID',
  })
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}
