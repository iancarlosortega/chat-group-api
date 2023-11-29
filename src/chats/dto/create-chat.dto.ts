import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, MinLength } from 'class-validator';

export class CreateChatDto {
  @ApiProperty({
    example: 'Nextjs Chat',
    description: 'Chat name',
    minLength: 3,
  })
  @IsString()
  @MinLength(3)
  name: string;

  @ApiProperty({
    example:
      'Ad dolor aute in laborum ex do aliquip incididunt sit do sit mollit commodo.',
    description: 'Chat description',
    nullable: true,
  })
  @IsString()
  @IsOptional()
  description?: string;
}
