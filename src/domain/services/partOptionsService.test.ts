import { Part } from '../entities/Product';
import { partOptionsService } from './partOptionsService';

describe('partOptionsService', () => {
  describe('getInitialPartOptions', () => {
    test('should select the first available and cheapest option', () => {
      const mockParts: Part[] = [
        {
          id: 'partId-1',
          name: 'part1',
          options: [
            { id: 'optionId-1', name: 'option1', additionalPrice: 0, available: false },
            { id: 'optionId-2', name: 'option2', additionalPrice: 20, available: true },
            { id: 'optionId-3', name: 'option3', additionalPrice: 30, available: true },
          ],
        },
      ];
      const result = partOptionsService.getInitialPartOptions({ parts: mockParts });
      expect(result).toEqual({ 'partId-1': 'optionId-2' });
    });
  });
});
