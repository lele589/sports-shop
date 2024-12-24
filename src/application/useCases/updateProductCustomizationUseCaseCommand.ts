import { productService } from '../../domain/services/productService';
import { GENERIC_USE_CASE_ERRORS } from './useCasesErrorConstants';
import { Product } from '../../domain/entities/Product';
import { ResultType } from '../../types/Generics';

type UpdateProductCustomizationUseCaseCommandTypes = ({
  product,
  selectedOptions,
}: {
  product: Product;
  selectedOptions: { [partId: string]: string };
}) => ResultType<{ productTotalPrice: number }>;

export const UpdateProductCustomizationUseCaseCommand: UpdateProductCustomizationUseCaseCommandTypes =
  ({
    product,
    selectedOptions,
  }: {
    product: Product;
    selectedOptions: { [partId: string]: string };
  }) => {
    const scope = '[USE_CASE/UPDATE_PRODUCT_CUSTOMIZATION]';
    try {
      const productTotalPrice = productService.calculateTotalPrice({
        baseProductPrice: product.basePrice,
        selectedOptions,
        parts: product.parts,
      });

      return {
        success: true,
        data: { productTotalPrice },
      };
    } catch {
      // although the error is not handled in this specific case in the component, we keep error management standardized
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
