import { IEvent } from './event';
import { ILiveStats } from './live-stats';

// [Trade-Off]
// According to the specs, the 'stats' should only exist for events where the status is 'live'.  In a production
// environment however, there could be stats for each status, and also based on the sport.  This would certainly
// be more complex to model, but just pointing it out.
export interface IAggregateEvent extends IEvent {
  stats?: ILiveStats;
};
