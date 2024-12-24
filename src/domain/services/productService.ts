import { Part } from '../entities/Product';

const calculateTotalPrice = ({
  baseProductPrice,
  selectedOptions,
  parts,
}: {
  baseProductPrice: number;
  selectedOptions: { [partId: string]: string };
  parts: Part[];
}): number => {
  if (!selectedOptions) {
    return baseProductPrice;
  }

  const additionalPartsPrice = parts.reduce((selectedOptionsTotalPrice, part) => {
    const selectedOption = part.options.find((option) => option.id === selectedOptions[part.id]);
    const selectedOptionPrice = selectedOption ? selectedOption.additionalPrice : 0;
    return selectedOptionsTotalPrice + selectedOptionPrice;
  }, 0);

  return baseProductPrice + additionalPartsPrice;
};

export const productService = { calculateTotalPrice };
