import { PartialType } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';
import { CreateMessageDto } from './create-message.dto';

export class UpdateMessageDto extends PartialType(CreateMessageDto) {
  @IsOptional()
  updatedAt?: Date;
}
