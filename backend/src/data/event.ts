
export interface Event {
  id: string;
  title: string;
  sport: string;
  league: string;
  status: 'scheduled' | 'live' | 'completed';
  startTime: string; // ISO date string
};
