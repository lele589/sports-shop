import { productService } from '../../domain/services/productService';
import { GENERIC_USE_CASE_ERRORS } from './useCasesErrorConstants';
import { Product } from '../../domain/entities/Product';
import { ResultType } from '../../types/Generics';
import { partOptionsService } from '../../domain/services/partOptionsService';

type UpdateProductCustomizationUseCaseCommandTypes = ({
  product,
  selectedOptions,
}: {
  product: Product;
  selectedOptions: { [partId: string]: string };
}) => ResultType<{ productTotalPrice: number; disallowedOptions: string[] }>;

export const UpdateProductCustomizationUseCaseCommand: UpdateProductCustomizationUseCaseCommandTypes =
  ({ product, selectedOptions }) => {
    const scope = '[USE_CASE/UPDATE_PRODUCT_CUSTOMIZATION]';
    try {
      const productTotalPrice = productService.calculateTotalPrice({
        baseProductPrice: product.basePrice,
        selectedOptions,
        parts: product.parts,
      });

      const disallowedOptions = partOptionsService.getDisallowedOptions({
        selectedOptions,
        dependencies: product.dependencies,
      });

      return {
        success: true,
        data: { productTotalPrice, disallowedOptions },
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
