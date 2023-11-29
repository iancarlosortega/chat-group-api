import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsUUID, MinLength } from 'class-validator';

export class CreateMessageDto {
  @ApiProperty({
    example:
      'Enim ea eiusmod nostrud Lorem aute consequat et laborum deserunt et qui.',
    description: 'Message content',
    minLength: 1,
  })
  @IsString()
  @MinLength(1)
  content: string;

  @ApiProperty({
    example: '7ab55156-76cc-410a-a921-e473c53604a0.',
    description: 'Chat room ID',
  })
  @IsString()
  @IsUUID()
  chatId: string;
}
