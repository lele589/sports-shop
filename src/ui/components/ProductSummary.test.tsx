import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import ProductSummary from './ProductSummary';

describe('ProductSummary', () => {
  it('display the total price with two decimal places', () => {
    const props = {
      isAvailableToBuy: true,
    };

    render(<ProductSummary price={1000} {...props} />);
    expect(screen.getByText(/1000.00/i)).toBeInTheDocument();
  });

  it('should enable button when product is available to buy', () => {
    render(<ProductSummary price={99.99} isAvailableToBuy={true} />);
    const button = screen.getByRole('button', { name: /add to cart/i });
    expect(button).toBeEnabled();
  });

  it('should disabled button when product is not available to buy', () => {
    render(<ProductSummary price={99.99} isAvailableToBuy={false} />);
    const button = screen.getByRole('button', { name: /add to cart/i });
    expect(button).toBeDisabled();
  });
});
