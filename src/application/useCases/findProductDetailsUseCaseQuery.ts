import { productService } from '../../domain/services/productService';
import { GENERIC_USE_CASE_ERRORS } from './useCasesErrorConstants';
import { Product } from '../../domain/entities/Product';
import { ResultType } from '../../types/Generics';

type FindProductDetailsUseCaseQueryTypes = ({
  productId,
}: {
  productId: number;
}) => Promise<ResultType<Product | null>>;

export const FindProductDetailsUseCaseQuery: FindProductDetailsUseCaseQueryTypes = async ({
  productId,
}) => {
  const scope = '[USE_CASE/FIND_PRODUCT_DETAILS]';
  try {
    const productDetails = await productService.findProductById({ productId });

    return {
      success: true,
      data: productDetails,
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
