export interface IEvent {
  readonly id: string;
  readonly title: string;
  readonly sport: string;
  readonly league: string;
  readonly status: 'upcoming' | 'live' | 'completed';
  readonly startTime: string; // ISO date string
};
