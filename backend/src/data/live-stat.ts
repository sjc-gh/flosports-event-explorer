
export interface LiveStat {
  eventId: string;
  viewerCount: number;
  peakViewerCount: number;
  streamHealth: 'excellent' | 'good' | 'fair' |'poor';
  lastUpdated: string; // ISO date string
}
