import { fireEvent, render, waitFor } from '@testing-library/react';
import ProductDetail from './ProductDetail';
import { productRepository } from '../../infrastructure/repositories/http/productRepository';
import { useCases } from '../../application/useCases/useCasesContainer';

jest.mock('../../infrastructure/repositories/http/productRepository', () => ({
  productRepository: {
    findProductById: jest.fn(),
  },
}));

const mockProductDefaults = {
  id: 'anId',
  name: 'aTitle',
  description: 'aDescription',
  basePrice: 1000,
  stock: 5,
  parts: [
    {
      id: '1',
      name: 'Part 1',
      options: [
        { id: 'anOptionId', name: 'anOption', additionalPrice: 0, stock: 1 },
        { id: 'anotherOptionId', name: 'anotherOption', additionalPrice: 10, stock: 3 },
      ],
    },
  ],
};

describe('ProductDetail', () => {
  it('should display product details', async () => {
    const mockProduct = {
      ...mockProductDefaults,
      name: 'aTitle',
      description: 'aDescription',
    };
    (productRepository.findProductById as jest.Mock).mockResolvedValue({
      success: true,
      data: mockProduct,
    });

    const { getByText } = render(<ProductDetail />);

    await waitFor(() => {
      expect(getByText(/aTitle/i)).toBeInTheDocument();
      expect(getByText(/aDescription/i)).toBeInTheDocument();
    });
  });
  it('should display loading when a product is not found', () => {
    (productRepository.findProductById as jest.Mock).mockImplementation(
      () => new Promise(() => {}),
    );

    const { getByText } = render(<ProductDetail />);

    expect(getByText(/loading/i)).toBeInTheDocument();
  });

});
