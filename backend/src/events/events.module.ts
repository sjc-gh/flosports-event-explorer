import { Module } from '@nestjs/common';
import { EventsController } from './events.controller';
import { EventsService } from './events.service';
import { EventDatabase } from '../data/event-database';
import { LiveStatsDatabase } from '../data/live-stats-database';

@Module({
  controllers: [EventsController],
  providers: [EventsService, EventDatabase, LiveStatsDatabase]
})
export class EventsModule {}
