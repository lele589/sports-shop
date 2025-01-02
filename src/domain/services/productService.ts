import { productRepository } from '../../infrastructure/repositories/http/productRepository';
import { Part } from '../../types/Part';
import { PartOption } from '../../types/PartOption';
import { Product } from '../../types/Product';

// Types
type calculateTotalPriceTypes = ({
  baseProductPrice,
  selectedOptions,
  parts,
}: {
  baseProductPrice: number;
  selectedOptions: { [partId: Part['id']]: PartOption['id'] };
  parts: Part[];
}) => number;

type findProductByIdTypes = ({
  productId,
}: {
  productId: Product['id'];
}) => Promise<Product | null>;

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
    const selectedOption = part.options.find(
      (option: PartOption) => option.id === selectedOptions[part.id],
    );
    const selectedOptionPrice = selectedOption ? selectedOption.additionalPrice : 0;
    return selectedOptionsTotalPrice + selectedOptionPrice;
  }, 0);

  return baseProductPrice + additionalPartsPrice;
};

const findProductById: findProductByIdTypes = async ({ productId }) => {
  const result = await productRepository.findProductById({ productId });
  if (!result.success) {
    return null;
  }
  return result.data;
};

export const productService = { calculateTotalPrice, findProductById };
