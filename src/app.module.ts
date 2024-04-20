import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EventGateway } from './event/event.gateway';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventService } from './event/event.service';
import { MessageQueue } from './event/entities/message-queue.entity';
import { EventModule } from './event/event.module';
import { ScheduleModule } from '@nestjs/schedule';
import { TaskServiceModule } from './task-service/task-service.module';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    EventModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'edoaurahman',
      password: 'edo24123',
      database: 'simasam',
      entities: [MessageQueue],
      synchronize: true,
      // timezone: 'Asia/Jakarta',
    }),
    TaskServiceModule,
  ],
  controllers: [AppController],
  providers: [AppService, EventGateway, EventService],
})
export class AppModule {}
