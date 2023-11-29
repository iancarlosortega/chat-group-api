import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MinLength } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    example: 'Ian Carlos Ortega',
    description: 'User full name',
    minLength: 3,
  })
  @IsString()
  @MinLength(3)
  fullName: string;

  @ApiProperty({
    example: 'iancarlosortegaleon@gmail.com',
    description: 'Must be a valid email format',
  })
  @IsString()
  @IsEmail()
  email: string;

  @ApiProperty({
    example: '$Asdf123',
    description: 'Should be very secure',
    minLength: 3,
  })
  @IsString()
  @MinLength(3)
  password: string;
}
