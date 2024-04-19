import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventService } from './event.service';
import { MessageQueue } from './entities/message-queue.entity';
import { EventController } from './event.controller';

@Module({
  imports: [TypeOrmModule.forFeature([MessageQueue])],
  providers: [EventService],
  exports: [TypeOrmModule],
  controllers: [EventController],
})
export class EventModule {}
