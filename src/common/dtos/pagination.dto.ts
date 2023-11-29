import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsOptional, Min } from 'class-validator';

export class PaginationDto {
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
