import {
  IsNumber,
  IsOptional,
  IsString,
  Matches,
  Min,
  MinLength,
} from 'class-validator';

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  @MinLength(3)
  fullName?: string;

  @IsOptional()
  @IsString()
  @Matches('^https?://')
  avatarUrl?: string;

  @IsOptional()
  @IsNumber()
  @Min(0)
  age?: number;

  @IsOptional()
  @IsString()
  gender?: string;

  @IsOptional()
  @IsString()
  @Matches('\\d{4}-(0?[1-9]|1[012])-(0?[1-9]|[12][0-9]|3[01])*') // Date 2023-05-30
  birthDate?: string;
}
