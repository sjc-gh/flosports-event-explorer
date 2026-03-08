import { SportsService } from './sports.service';
import { EventDatabase } from '../data/event-database';

describe('SportsService', () => {
  let eventDatabase: jest.Mocked<EventDatabase>;

  const mockEvents = [
    { id: '1', sport: 'Basketball', title: 'Game 1' } as any,
    { id: '2', sport: 'Football', title: 'Game 2' } as any,
    { id: '3', sport: 'Basketball', title: 'Game 3' } as any,
    { id: '4', sport: 'Soccer', title: 'Game 4' } as any,
    { id: '5', sport: 'Basketball', title: 'Game 5' } as any,
  ];

  beforeEach(() => {
    eventDatabase = {
      findAll: jest.fn(),
      findOne: jest.fn(),
    } as unknown as jest.Mocked<EventDatabase>;
  });

  it('should be defined', () => {
    expect(SportsService).toBeDefined();
  });

  describe('constructor', () => {
    it('should extract unique sports from events and sort them alphabetically', () => {
      // Arrange
      eventDatabase.findAll.mockReturnValue(mockEvents);

      // Act - Create new service instance to test constructor
      const service = new SportsService(eventDatabase);

      // Assert
      expect(eventDatabase.findAll).toHaveBeenCalledTimes(1);
      const result = service.findAll();
      expect(result).toEqual(['Basketball', 'Football', 'Soccer']);
    });

    it('should handle empty events array', () => {
      // Arrange
      eventDatabase.findAll.mockReturnValue([]);

      // Act
      const service = new SportsService(eventDatabase);

      // Assert
      const result = service.findAll();
      expect(result).toEqual([]);
    });

    it('should handle single event', () => {
      // Arrange
      const singleEvent = [{ id: '1', sport: 'Tennis', title: 'Game 1' } as any];
      eventDatabase.findAll.mockReturnValue(singleEvent);

      // Act
      const service = new SportsService(eventDatabase);

      // Assert
      const result = service.findAll();
      expect(result).toEqual(['Tennis']);
    });

    it('should handle events with same sport (no duplicates)', () => {
      // Arrange
      const sameSportEvents = [
        { id: '1', sport: 'Basketball', title: 'Game 1' } as any,
        { id: '2', sport: 'Basketball', title: 'Game 2' } as any,
        { id: '3', sport: 'Basketball', title: 'Game 3' } as any,
      ];
      eventDatabase.findAll.mockReturnValue(sameSportEvents);

      // Act
      const service = new SportsService(eventDatabase);

      // Assert
      const result = service.findAll();
      expect(result).toEqual(['Basketball']);
      expect(result).toHaveLength(1);
    });

    it('should sort sports alphabetically', () => {
      // Arrange
      const unsortedEvents = [
        { id: '1', sport: 'Zebra', title: 'Game 1' } as any,
        { id: '2', sport: 'Alpha', title: 'Game 2' } as any,
        { id: '3', sport: 'Bravo', title: 'Game 3' } as any,
      ];
      eventDatabase.findAll.mockReturnValue(unsortedEvents);

      // Act
      const service = new SportsService(eventDatabase);

      // Assert
      const result = service.findAll();
      expect(result).toEqual(['Alpha', 'Bravo', 'Zebra']);
    });

    it('should handle case-sensitive sport names', () => {
      // Arrange
      const caseEvents = [
        { id: '1', sport: 'basketball', title: 'Game 1' } as any,
        { id: '2', sport: 'Basketball', title: 'Game 2' } as any,
        { id: '3', sport: 'FOOTBALL', title: 'Game 3' } as any,
      ];
      eventDatabase.findAll.mockReturnValue(caseEvents);

      // Act
      const service = new SportsService(eventDatabase);

      // Assert
      const result = service.findAll();
      expect(result).toEqual(['Basketball', 'FOOTBALL', 'basketball']);
    });
  });

  describe('findAll', () => {
    it('should return the processed sports array', () => {
      // Arrange
      eventDatabase.findAll.mockReturnValue(mockEvents);

      // Act - Create new service to test
      const service = new SportsService(eventDatabase);
      const result = service.findAll();

      // Assert
      expect(result).toEqual(['Basketball', 'Football', 'Soccer']);
      expect(Array.isArray(result)).toBe(true);
    });

    it('should return the same array instance on multiple calls', () => {
      // Arrange
      eventDatabase.findAll.mockReturnValue(mockEvents);

      // Act
      const service = new SportsService(eventDatabase);
      const result1 = service.findAll();
      const result2 = service.findAll();

      // Assert
      expect(result1).toBe(result2); // Same reference
      expect(result1).toEqual(result2);
    });

    it('should return empty array when no events exist', () => {
      // Arrange
      eventDatabase.findAll.mockReturnValue([]);

      // Act
      const service = new SportsService(eventDatabase);
      const result = service.findAll();

      // Assert
      expect(result).toEqual([]);
      expect(result).toHaveLength(0);
    });
  });
});
