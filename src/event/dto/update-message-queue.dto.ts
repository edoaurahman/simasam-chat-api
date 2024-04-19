import { PartialType } from '@nestjs/mapped-types';
import { CreateMessageQueueDto } from './create-message-queue.dto';

export class UpdateMessageQueueDto extends PartialType(CreateMessageQueueDto) {}
