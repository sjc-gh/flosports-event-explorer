import { Injectable, NotFoundException } from '@nestjs/common';
import { EventDatabase } from '../data/event-database';
import { IAggregateEvent } from '../data/aggregate-event';
import { LiveStatsDatabase } from '../data/live-stats-database';

@Injectable()
export class EventsService {
  constructor(private eventDatabase: EventDatabase, private liveStatsDatabase: LiveStatsDatabase) {}

  findOne(id: string): IAggregateEvent {
    const event = this.eventDatabase.findOne(id);
    if (event) {
      return this.aggregateEvent(event);
    }
    throw new NotFoundException(`Event with id ${id} not found`);
  }

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

      // User might search for "NFL and "Bears", but they may not be adjacent in the title.
      const searchTerms = searchTerm.split(' ');

      // [TODO] Optimize this search logic.
      filteredEvents = filteredEvents.filter(event =>
        searchTerms.every(term => event.title.toLowerCase().includes(term))
      );
    }

    return filteredEvents.map(event => this.aggregateEvent(event));
  }

  private aggregateEvent(event: IAggregateEvent): IAggregateEvent {
    const aggregateEvent: IAggregateEvent = {
      ...event
    };
    // Only if the event status is 'live' should we fetch the live stats.
    if (event.status === 'live') {
      aggregateEvent.stats = this.liveStatsDatabase.findOne(event.id);
    }
    return aggregateEvent;
  }
}
