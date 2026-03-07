import { Injectable, NotFoundException } from '@nestjs/common';

import { IAggregateEvent } from '../data/aggregate-event';
import { IEvent } from '../data/event';
import { EventDatabase } from '../data/event-database';
import { LiveStatsDatabase } from '../data/live-stats-database';

@Injectable()
export class EventService {
  constructor(private eventDatabase: EventDatabase, private liveStatsDatabase: LiveStatsDatabase) {}

  findAll() {
    return this.eventDatabase.findAll();
  }

  findOne(id: string): IAggregateEvent {
    const event = this.eventDatabase.findOne(id);
    if (event) {
      return {
        ...event,
        stats: this.liveStatsDatabase.findOne(event.id)
      };
    }
    throw new NotFoundException(`Event with id ${id} not found`);
  }
}
