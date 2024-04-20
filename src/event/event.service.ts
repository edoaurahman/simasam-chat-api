import { Injectable } from '@nestjs/common';
import { MessageQueue } from './entities/message-queue.entity';
import { CreateMessageQueueDto } from './dto/create-message-queue.dto';
import { MoreThan, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { log } from 'console';

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
    return this.messageRepository.findBy({ time: MoreThan(lastTime) });
  }

  async getAllMessage(): Promise<CreateMessageQueueDto[]> {
    return this.messageRepository.query('SELECT * FROM message_queue');
  }
}
