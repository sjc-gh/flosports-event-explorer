import { Injectable } from '@nestjs/common';
import { Database } from './database';
import { ILiveStats } from './live-stats';

// [Trade-Off]
// See Database.ts for discussion on trade-offs of using a singleton pattern for the database.
@Injectable()
export class LiveStatsDatabase extends Database<ILiveStats> {
  constructor() {
    super('live-stats', liveStats => liveStats.eventId);
  }
}
