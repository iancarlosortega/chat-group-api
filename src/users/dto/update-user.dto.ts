import { ApiProperty } from '@nestjs/swagger';
import {
  IsNumber,
  IsOptional,
  IsString,
  Matches,
  Min,
  MinLength,
} from 'class-validator';

export class UpdateUserDto {
  @ApiProperty({
    example: 'Ian Carlos Ortega',
    description: 'User full name',
    minLength: 3,
    nullable: true,
  })
  @IsOptional()
  @IsString()
  @MinLength(3)
  fullName?: string;

  @ApiProperty({
    example:
      'https://localhost:4000/dps7cc0eo/image/upload/v1700689732/hlfremyd07cz3uoxko17.jpg',
    description: 'User avatar image, should be a valid and secure URL',
    nullable: true,
  })
  @IsOptional()
  @IsString()
  @Matches('^https?://')
  avatarUrl?: string;

  @ApiProperty({
    example: 18,
    description: 'User age',
    minimum: 0,
    nullable: true,
  })
  @IsOptional()
  @IsNumber()
  @Min(0)
  age?: number;

  @ApiProperty({
    example: 'Male',
    description: 'User gender',
    nullable: true,
  })
  @IsOptional()
  @IsString()
  gender?: string;

  @ApiProperty({
    example: '2001-03-25',
    description: 'User birthDate',
    nullable: true,
  })
  @IsOptional()
  @IsString()
  @Matches('\\d{4}-(0?[1-9]|1[012])-(0?[1-9]|[12][0-9]|3[01])*') // Date 2023-05-30
  birthDate?: string;
}
