import { productService } from './productService';

describe('productService', () => {
  describe('calculateTotalPrice', () => {
    it('should not change the product price if no options are selected', () => {
      const mockParts = [
        {
          id: 1,
          name: 'part1',
          options: [
            { id: 1, name: 'option1', additionalPrice: 0, stock: 0 },
            { id: 2, name: 'option2', additionalPrice: 20, stock: 1 },
            { id: 3, name: 'option3', additionalPrice: 30, stock: 5 },
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
    it('should calculate the product price by adding the selected options price', () => {
      const mockParts = [
        {
          id: 1,
          name: 'part1',
          options: [
            { id: 1, name: 'option1', additionalPrice: 0, stock: 0 },
            { id: 2, name: 'option2', additionalPrice: 20, stock: 2 },
            { id: 3, name: 'option3', additionalPrice: 30, stock: 2 },
          ],
        },
        {
          id: 2,
          name: 'part2',
          options: [
            { id: 4, name: 'option4', additionalPrice: 0, stock: 0 },
            { id: 5, name: 'option5', additionalPrice: 15, stock: 3 },
          ],
        },
      ];
      const baseProductPrice = 100;
      const selectedOptions = { 1: 2, 2: 5 };

      const result = productService.calculateTotalPrice({
        baseProductPrice,
        selectedOptions,
        parts: mockParts,
      });

      expect(result).toBe(baseProductPrice + 20 + 15);
    });
  });
});
