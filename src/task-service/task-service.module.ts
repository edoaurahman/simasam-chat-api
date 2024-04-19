import { Module } from '@nestjs/common';
import { TasksService } from './task-service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MessageQueue } from 'src/event/entities/message-queue.entity';

@Module({
  imports: [TypeOrmModule.forFeature([MessageQueue])],
  providers: [TasksService],
  exports: [TypeOrmModule],
})
export class TaskServiceModule {}
