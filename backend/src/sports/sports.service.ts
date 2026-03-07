import { Injectable } from '@nestjs/common';

import { EventDatabase } from '../data/event-database';

@Injectable()
export class SportsService {
  private sports: string[] = [];

  constructor(private eventDatabase: EventDatabase) {
    // Get all the events from the database, extract the sports, and store unique sports in the this.sports array.
    // Sort the final list of sports alphabetically for better user experience.
    this.sports = eventDatabase.findAll().reduce((sports, event) => {
      if (!sports.includes(event.sport)) {
        sports.push(event.sport);
      }
      return sports;
    }, [] as string[]).sort();
  }

  findAll() {
    return this.sports;
  }
}