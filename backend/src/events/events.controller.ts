import { Controller, Get, Query } from '@nestjs/common';
import { EventsService } from './events.service';

@Controller('events')
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @Get()
  findAll(
    @Query('live') live?: string,
    @Query('sport') sport?: string,
    @Query('search') search?: string,
  ) {
    return this.eventsService.findAll({
      live: live === 'true',
      sport,
      search
    });
  }
}
