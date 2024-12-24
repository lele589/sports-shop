import { productService } from '../../domain/services/productService';
import { GENERIC_USE_CASE_ERRORS } from './useCasesErrorConstants';
import { Part } from '../../domain/entities/Product';

export const CalculateProductPriceUseCaseCommand = ({
  baseProductPrice,
  selectedOptions,
  parts,
}: {
  baseProductPrice: number;
  selectedOptions: { [partId: string]: string };
  parts: Part[];
}) => {
  const scope = '[USE_CASE/CALCULATE_PRODUCT_PRICE]';
  try {
    const productTotalPrice = productService.calculateTotalPrice({
      baseProductPrice,
      selectedOptions,
      parts,
    });

    return {
      success: true,
      data: productTotalPrice,
    };
  } catch {
    const errorMessage = 'Unexpected error';
    return {
      success: false,
      error: {
        type: GENERIC_USE_CASE_ERRORS.UNEXPECTED,
        message: `${scope} ${errorMessage}`,
      },
    };
  }
};
