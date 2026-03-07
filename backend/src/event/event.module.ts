import { Module } from '@nestjs/common';
import { EventController } from './event.controller';
import { EventDatabase } from '../data/event-database';
import { LiveStatsDatabase } from '../data/live-stats-database';
import { EventsService } from '../events/events.service';

@Module({
  controllers: [EventController],
  providers: [EventsService, EventDatabase, LiveStatsDatabase]
})
export class EventModule {}
