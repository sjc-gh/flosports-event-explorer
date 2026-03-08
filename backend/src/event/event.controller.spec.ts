import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';
import { EventController } from './event.controller';
import { EventsService } from '../events/events.service';

describe('EventController', () => {
  let controller: EventController;
  let eventsService: jest.Mocked<EventsService>;

  const mockEvent = {
    id: 'evt-0001',
    title: 'Test Event',
    sport: 'Basketball',
    league: 'NBA',
    status: 'live' as const,
    startTime: '2026-03-07T12:00:00.000Z',
    liveStats: {
      score: '75-70',
      period: 'Q4',
      timeRemaining: '5:23'
    }
  };

  beforeEach(async () => {
    const mockEventsService = {
      findOne: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [EventController],
      providers: [
        {
          provide: EventsService,
          useValue: mockEventsService,
        },
      ],
    }).compile();

    controller = module.get<EventController>(EventController);
    eventsService = module.get(EventsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findOne', () => {
    it('should return an event when found', () => {
      // Arrange
      const eventId = 'evt-0001';
      eventsService.findOne.mockReturnValue(mockEvent);

      // Act
      const result = controller.findOne(eventId);

      // Assert
      expect(eventsService.findOne).toHaveBeenCalledWith(eventId);
      expect(result).toEqual(mockEvent);
    });

    it('should throw NotFoundException when event is not found', () => {
      // Arrange
      const eventId = 'non-existent-id';
      eventsService.findOne.mockImplementation(() => {
        throw new NotFoundException(`Event with id ${eventId} not found`);
      });

      // Act & Assert
      expect(() => controller.findOne(eventId)).toThrow(NotFoundException);
      expect(() => controller.findOne(eventId)).toThrow(`Event with id ${eventId} not found`);
      expect(eventsService.findOne).toHaveBeenCalledWith(eventId);
    });

    it('should pass the correct id parameter to the service', () => {
      // Arrange
      const eventId = 'test-id-123';
      eventsService.findOne.mockReturnValue(mockEvent);

      // Act
      controller.findOne(eventId);

      // Assert
      expect(eventsService.findOne).toHaveBeenCalledTimes(1);
      expect(eventsService.findOne).toHaveBeenCalledWith(eventId);
    });

    it('should handle different event IDs', () => {
      // Arrange
      const testCases = ['evt-0001', 'evt-0002', 'custom-id'];

      testCases.forEach(eventId => {
        eventsService.findOne.mockReturnValue({ ...mockEvent, id: eventId });

        // Act
        const result = controller.findOne(eventId);

        // Assert
        expect(result.id).toBe(eventId);
        expect(eventsService.findOne).toHaveBeenCalledWith(eventId);
      });

      expect(eventsService.findOne).toHaveBeenCalledTimes(testCases.length);
    });
  });
});
