import { IsOptional, IsString, Matches, MinLength } from 'class-validator';

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  @MinLength(3)
  fullName?: string;

  @IsOptional()
  @IsString()
  @Matches('^https?://')
  avatarUrl?: string;
}
