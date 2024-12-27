import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import PartCustomizer from './PartCustomizer';
import { Part } from '../../domain/entities/Product';

const mockPartDefaults = {
  id: 'aPartId',
  name: 'aPartName',
};

const mockOptionDefaults = {
  id: 'anOptionId',
  name: 'anOption',
  available: true,
  additionalPrice: 0,
};

const mockOnOptionChange = jest.fn();

describe('PartCustomizer', () => {
  it('should enable options that are available and allowed', () => {
    const mockPart: Part = {
      ...mockPartDefaults,
      options: [
        {
          ...mockOptionDefaults,
          available: true,
        },
      ],
    };

    const { getByText } = render(
      <PartCustomizer
        part={mockPart}
        selectedOption={null}
        disallowedOptions={[]}
        onOptionChange={mockOnOptionChange}
      />,
    );

    const option2 = getByText(/anOption/i);
    expect(option2).not.toBeDisabled();
  });

  it('should disable options that are not available', () => {
    const mockPart: Part = {
      ...mockPartDefaults,
      options: [
        {
          ...mockOptionDefaults,
          available: false,
        },
      ],
    };

    const { getByText } = render(
      <PartCustomizer
        part={mockPart}
        selectedOption={null}
        disallowedOptions={[]}
        onOptionChange={mockOnOptionChange}
      />,
    );

    const option2 = getByText(/anOption/i);
    expect(option2).toBeDisabled();
  });

  it('should disable options that are disallowed', () => {
    const disallowedOptionId = 'aDisallowedOptionId';

    const mockPart: Part = {
      ...mockPartDefaults,
      options: [
        {
          ...mockOptionDefaults,
          id: disallowedOptionId,
        },
      ],
    };

    const { getByText } = render(
      <PartCustomizer
        part={mockPart}
        selectedOption={null}
        disallowedOptions={[disallowedOptionId]}
        onOptionChange={mockOnOptionChange}
      />,
    );

    const option2 = getByText(/anOption/i);
    expect(option2).toBeDisabled();
  });

  it('should select the chosen option for the user', () => {
    const mockPart: Part = {
      ...mockPartDefaults,
      options: [
        {
          ...mockOptionDefaults,
        },
      ],
    };

    const currentSelectedOption = mockOptionDefaults.id;

    const { getByText } = render(
      <PartCustomizer
        part={mockPart}
        selectedOption={currentSelectedOption}
        disallowedOptions={[]}
        onOptionChange={mockOnOptionChange}
      />,
    );

    const option = getByText(/anOption/i);
    expect(option).toHaveClass(/bg-blue-500/i);
  });

  it('should change selected option when an option is clicked', () => {
    const mockPart: Part = {
      ...mockPartDefaults,
      options: [
        {
          ...mockOptionDefaults,
        },
      ],
    };

    const { getByText } = render(
      <PartCustomizer
        part={mockPart}
        selectedOption={null}
        disallowedOptions={[]}
        onOptionChange={mockOnOptionChange}
      />,
    );

    const option = getByText(/anOption/i);
    option.click();
    expect(mockOnOptionChange).toHaveBeenCalledWith(mockPartDefaults.id, mockOptionDefaults.id);
  });
});
