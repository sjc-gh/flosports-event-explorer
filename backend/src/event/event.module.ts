import { Module } from '@nestjs/common';
import { EventController } from './event.controller';
import { EventService } from './event.service';
import { EventDatabase } from '../data/event-database';
import { LiveStatsDatabase } from '../data/live-stats-database';

@Module({
  controllers: [EventController],
  providers: [EventService, EventDatabase, LiveStatsDatabase]
})
export class EventModule {}
