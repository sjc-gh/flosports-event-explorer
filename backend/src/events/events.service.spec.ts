import { Test, TestingModule } from '@nestjs/testing';
import { EventsService } from './events.service';
import { EventDatabase } from '../data/event-database';
import { LiveStatsDatabase } from '../data/live-stats-database';

describe('EventsService', () => {
  let service: EventsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EventsService, EventDatabase, LiveStatsDatabase],
    }).compile();

    service = module.get<EventsService>(EventsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
