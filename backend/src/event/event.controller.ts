import { Controller, Get, Param } from '@nestjs/common';
import { EventsService } from '../events/events.service';

@Controller('event')
export class EventController {
  constructor(private readonly eventsService: EventsService) {}

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.eventsService.findOne(id);}
}
