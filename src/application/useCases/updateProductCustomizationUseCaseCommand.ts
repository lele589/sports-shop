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
  selectedOptions: { [partId: number]: number };
}) => ResultType<{
  productTotalPrice: number;
  disallowedOptions: number[];
  updatedSelectedOptions: { [partId: number]: number };
}>;

export const UpdateProductCustomizationUseCaseCommand: UpdateProductCustomizationUseCaseCommandTypes =
  ({ product, selectedOptions }) => {
    const scope = '[USE_CASE/UPDATE_PRODUCT_CUSTOMIZATION]';
    try {
      const disallowedOptions = partOptionsService.identifyDisallowedOptions({
        selectedOptions,
        dependencies: product.dependencies,
      });

      const updatedSelectedOptions = partOptionsService.filterSelectedOptions({
        selectedOptions,
        disallowedOptions,
      });

      const productTotalPrice = productService.calculateTotalPrice({
        baseProductPrice: product.basePrice,
        selectedOptions: updatedSelectedOptions,
        parts: product.parts,
      });

      return {
        success: true,
        data: { productTotalPrice, disallowedOptions, updatedSelectedOptions },
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
