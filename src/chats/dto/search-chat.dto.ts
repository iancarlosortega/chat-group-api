import { Type } from 'class-transformer';
import { IsOptional, IsString, Min } from 'class-validator';

export class SearchChatDto {
  @IsOptional()
  @IsString()
  term?: string;

  @IsOptional()
  @Min(0)
  @Type(() => Number)
  limit?: number;

  @IsOptional()
  @Min(0)
  @Type(() => Number)
  offset?: number;
}
