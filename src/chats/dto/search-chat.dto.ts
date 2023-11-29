import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsOptional, IsString, Min } from 'class-validator';

export class SearchChatDto {
  @ApiProperty({
    example: 'travel',
    description: 'Term to find chats by coincidences in their names',
    nullable: true,
  })
  @IsOptional()
  @IsString()
  term?: string;

  @ApiProperty({
    example: 10,
    description: 'Number of rows user needs',
    default: 10,
    minimum: 0,
  })
  @IsOptional()
  @Min(0)
  @Type(() => Number)
  limit?: number;

  @ApiProperty({
    example: 5,
    description: 'Number of rows user needs to skip',
    default: 0,
    minimum: 0,
  })
  @IsOptional()
  @Min(0)
  @Type(() => Number)
  offset?: number;
}
