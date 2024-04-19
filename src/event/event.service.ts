import { Injectable } from '@nestjs/common';
import { MessageQueue } from './entities/message-queue.entity';
import { CreateMessageQueueDto } from './dto/create-message-queue.dto';
import { MoreThanOrEqual, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class EventService {
  constructor(
    @InjectRepository(MessageQueue)
    private messageRepository: Repository<MessageQueue>,
  ) {}

  async saveMessage(message: CreateMessageQueueDto): Promise<any> {
    return this.messageRepository.save(message);
  }

  async getNewMessage(lastTime: string): Promise<CreateMessageQueueDto[]> {
    return this.messageRepository.findBy({ time: MoreThanOrEqual(lastTime) });
  }
}
