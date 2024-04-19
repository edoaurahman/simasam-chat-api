import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { InjectRepository } from '@nestjs/typeorm';
import { MessageQueue } from 'src/event/entities/message-queue.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(MessageQueue)
    private messageRepository: Repository<MessageQueue>,
  ) {}
  private readonly logger = new Logger(TasksService.name);

  @Cron(CronExpression.EVERY_WEEK)
  handleCron() {
    this.logger.debug('Clear all message queue');
    this.messageRepository.clear();
  }
}
