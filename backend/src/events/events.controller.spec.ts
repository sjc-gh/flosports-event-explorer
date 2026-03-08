import { Test, TestingModule } from '@nestjs/testing';

import { EventsController } from './events.controller';
import { EventsService } from './events.service';
import { EventDatabase } from '../data/event-database';
import { LiveStatsDatabase } from '../data/live-stats-database';

describe('EventsController', () => {
  let controller: EventsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EventsController],
      providers: [EventsService, EventDatabase, LiveStatsDatabase]
    }).compile();

    controller = module.get<EventsController>(EventsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
