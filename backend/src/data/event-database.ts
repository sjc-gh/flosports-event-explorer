import { Injectable } from '@nestjs/common';
import { Database } from './database';
import { IEvent } from './event';

// [Trade-Off]
// See Database.ts for discussion on trade-offs of using a singleton pattern for the database.
@Injectable()
export class EventDatabase extends Database<IEvent> {
  constructor() {
    super('events', event => event.id);
  }
}
