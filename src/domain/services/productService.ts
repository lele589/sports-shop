import { ProductRepository } from '../../infrastructure/repositories/http/ProductRepository';
import { Part } from '../entities/Part';
import { Product } from '../entities/Product';

// Types
type calculateTotalPriceTypes = ({
  baseProductPrice,
  selectedOptions,
  parts,
}: {
  baseProductPrice: number;
  selectedOptions: { [partId: number]: number };
  parts: Part[];
}) => number;

type findProductByIdTypes = ({ productId }: { productId: number }) => Promise<Product | null>;

// Methods
const calculateTotalPrice: calculateTotalPriceTypes = ({
  baseProductPrice,
  selectedOptions,
  parts,
}) => {
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

const findProductById: findProductByIdTypes = async ({ productId }) => {
  const result = await ProductRepository.findProductById({ productId });
  if (!result.success) {
    return null;
  }
  return result.data;
};

export const productService = { calculateTotalPrice, findProductById };
