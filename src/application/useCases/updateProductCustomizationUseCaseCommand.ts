import { productService } from '../../domain/services/productService';
import { GENERIC_USE_CASE_ERRORS } from './useCasesErrorConstants';
import { Product } from '../../types/Product';
import { ResultType } from '../../types/Generics';
import { partOptionsService } from '../../domain/services/partOptionsService';
import { Part } from '../../../.history/src/domain/entities/Part_20241230131909';
import { PartOption } from '../../types/PartOption';

type UpdateProductCustomizationUseCaseCommandTypes = ({
  product,
  selectedOptions,
}: {
  product: Product;
  selectedOptions: { [partId: Part['id']]: PartOption['id'] };
}) => ResultType<{
  productTotalPrice: number;
  disallowedOptions: PartOption['id'][];
  updatedSelectedOptions: { [partId: Part['id']]: PartOption['id'] };
}>;

export const UpdateProductCustomizationUseCaseCommand: UpdateProductCustomizationUseCaseCommandTypes =
  ({ product, selectedOptions }) => {
    const scope = '[USE_CASE/UPDATE_PRODUCT_CUSTOMIZATION]';
    try {
      const disallowedOptions = partOptionsService.identifyDisallowedOptions({
        selectedOptions,
        dependencies: product.dependencies,
      });

      const updatedSelectedOptions: { [partId: string]: PartOption['id'] } =
        partOptionsService.filterSelectedOptions({
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
