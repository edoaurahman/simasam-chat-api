import { Body, Controller, Get, Post } from '@nestjs/common';
import { EventService } from './event.service';

@Controller('new-message')
export class EventController {
  constructor(private readonly eventService: EventService) {}
  @Post()
  getNewMessage(@Body('time') req: string) {
    return this.eventService.getNewMessage(req);
  }

  @Get()
  getAllMessage() {
    return this.eventService.getAllMessage();
  }
}
