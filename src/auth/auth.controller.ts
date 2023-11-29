import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from 'src/users/entities/user.entity';
import { Auth } from './decorators/auth.decorator';
import { AuthService } from './auth.service';
import { GetUser } from './decorators/get-user.decorator';
import { LoginUserDto } from './dtos/login-user.dto';
import { CreateUserDto } from './dtos/create-user.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @ApiResponse({
    status: '2XX',
    description: 'User registered succesfully',
    type: User,
  })
  @ApiResponse({ status: '4XX', description: 'Email already taken' })
  registerUser(@Body() createUserDto: CreateUserDto) {
    return this.authService.register(createUserDto);
  }

  @Post('login')
  @ApiResponse({
    status: '2XX',
    description: 'User logged in succesfully',
    type: User,
  })
  @ApiResponse({ status: '4XX', description: 'Invalid credentials' })
  loginUser(@Body() loginUserDto: LoginUserDto) {
    return this.authService.login(loginUserDto);
  }

  @Get('check-status')
  @Auth()
  @ApiResponse({
    status: '2XX',
    description: 'Token revalidated',
    type: User,
  })
  @ApiResponse({ status: '4XX', description: 'Invalid token' })
  checkAuthStatus(@GetUser() user: User) {
    return this.authService.checkAuthStatus(user);
  }
}
