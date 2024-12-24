import { productService } from './productService';

describe('productService', () => {
  describe('calculateTotalPrice', () => {
    test('should not change the product price if no options are selected', () => {
      const mockParts = [
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
      const baseProductPrice = 100;
      const selectedOptions = {};

      const result = productService.calculateTotalPrice({
        baseProductPrice,
        selectedOptions,
        parts: mockParts,
      });

      expect(result).toBe(baseProductPrice);
    });
    test('should calculate the product price by adding the selected options price', () => {
      const mockParts = [
        {
          id: 'partId-1',
          name: 'part1',
          options: [
            { id: 'optionId-1', name: 'option1', additionalPrice: 0, available: false },
            { id: 'optionId-2', name: 'option2', additionalPrice: 20, available: true },
            { id: 'optionId-3', name: 'option3', additionalPrice: 30, available: true },
          ],
        },
        {
          id: 'partId-2',
          name: 'part2',
          options: [
            { id: 'optionId-4', name: 'option4', additionalPrice: 0, available: false },
            { id: 'optionId-5', name: 'option5', additionalPrice: 15, available: true },
          ],
        },
      ];
      const baseProductPrice = 100;
      const selectedOptions = { 'partId-1': 'optionId-2', 'partId-2': 'optionId-5' };

      const result = productService.calculateTotalPrice({
        baseProductPrice,
        selectedOptions,
        parts: mockParts,
      });

      expect(result).toBe(baseProductPrice + 20 + 15);
    });
  });
});
