import { Injectable } from '@nestjs/common';
import { EventDatabase } from '../data/event-database';
import { IAggregateEvent } from '../data/aggregate-event';
import { LiveStatsDatabase } from '../data/live-stats-database';

@Injectable()
export class EventsService {
  constructor(private eventDatabase: EventDatabase, private liveStatsDatabase: LiveStatsDatabase) {}

  findAll(query?: { live?: boolean; sport?: string; search?: string }): ReadonlyArray<IAggregateEvent> {
    const events = this.eventDatabase.findAll();
    let filteredEvents = events;

    if (query?.live) {
      filteredEvents = filteredEvents.filter(event => event.status === 'live');
    }

    if (query?.sport) {
      filteredEvents = filteredEvents.filter(event =>
        event.sport.toLowerCase() === query.sport!.toLowerCase()
      );
    }

    if (query?.search) {
      const searchTerm = query.search.toLowerCase();
      filteredEvents = filteredEvents.filter(event =>
        event.title.toLowerCase().includes(searchTerm)
      );
    }

    return filteredEvents.map(event => ({ ...event, stats: this.liveStatsDatabase.findOne(event.id) }));
  }
}
