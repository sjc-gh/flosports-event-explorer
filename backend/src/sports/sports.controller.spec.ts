import { Test, TestingModule } from '@nestjs/testing';
import { SportsController } from './sports.controller';
import { SportsService } from './sports.service';

describe('SportsController', () => {
  let controller: SportsController;
  let sportsService: jest.Mocked<SportsService>;

  const mockSports = ['Basketball', 'Football', 'Soccer', 'Tennis'];

  beforeEach(async () => {
    const mockSportsService = {
      findAll: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [SportsController],
      providers: [
        {
          provide: SportsService,
          useValue: mockSportsService,
        },
      ],
    }).compile();

    controller = module.get<SportsController>(SportsController);
    sportsService = module.get(SportsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of sports', () => {
      // Arrange
      sportsService.findAll.mockReturnValue(mockSports);

      // Act
      const result = controller.findAll();

      // Assert
      expect(sportsService.findAll).toHaveBeenCalledTimes(1);
      expect(result).toEqual(mockSports);
    });

    it('should return empty array when no sports are available', () => {
      // Arrange
      const emptySports: string[] = [];
      sportsService.findAll.mockReturnValue(emptySports);

      // Act
      const result = controller.findAll();

      // Assert
      expect(result).toEqual([]);
      expect(result).toHaveLength(0);
    });

    it('should return sports in the order provided by the service', () => {
      // Arrange
      const unsortedSports = ['Zulu', 'Alpha', 'Bravo'];
      sportsService.findAll.mockReturnValue(unsortedSports);

      // Act
      const result = controller.findAll();

      // Assert
      expect(result).toEqual(unsortedSports);
      expect(result[0]).toBe('Zulu');
      expect(result[1]).toBe('Alpha');
      expect(result[2]).toBe('Bravo');
    });

    it('should handle single sport array', () => {
      // Arrange
      const singleSport = ['Basketball'];
      sportsService.findAll.mockReturnValue(singleSport);

      // Act
      const result = controller.findAll();

      // Assert
      expect(result).toEqual(['Basketball']);
      expect(result).toHaveLength(1);
    });

    it('should handle large arrays of sports', () => {
      // Arrange
      const largeSportsArray = Array.from({ length: 100 }, (_, i) => `Sport${i + 1}`);
      sportsService.findAll.mockReturnValue(largeSportsArray);

      // Act
      const result = controller.findAll();

      // Assert
      expect(result).toHaveLength(100);
      expect(result[0]).toBe('Sport1');
      expect(result[99]).toBe('Sport100');
    });

    it('should return the exact same array reference from the service', () => {
      // Arrange
      sportsService.findAll.mockReturnValue(mockSports);

      // Act
      const result = controller.findAll();

      // Assert
      expect(result).toBe(mockSports); // Same reference
    });
  });
});
