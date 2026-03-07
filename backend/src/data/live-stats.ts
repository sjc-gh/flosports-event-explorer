export interface ILiveStats {
  readonly eventId: string;
  readonly viewerCount: number;
  readonly peakViewerCount: number;
  readonly streamHealth: 'excellent' | 'good' | 'fair' |'poor';
  readonly lastUpdated: string; // ISO date string
}
