import { IsString, IsUUID, MinLength } from 'class-validator';

export class CreateMessageDto {
  @IsString()
  @MinLength(1)
  content: string;

  @IsString()
  @IsUUID()
  chatId: string;
}
