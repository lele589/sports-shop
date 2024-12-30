import { Product } from '../../../domain/entities/Product';
import { ResultType } from '../../../types/Generics';
import { GENERIC_API_ERRORS } from './APIErrorConstants';

// Types
type findProductByIdTypes = ({ productId }: { productId: number }) => Promise<ResultType<Product>>;

// Methods
const findProductById: findProductByIdTypes = async () => {
  const scope = '[REPOSITORY/FIND_PRODUCT_BY_ID]';

  try {
    const response = await fetch('http://localhost:3000/api/product/1', {
      method: 'GET',
    });

    const parsedProductResponse = await response.json();
    const product = parsedProductResponse.data;

    return {
      success: true,
      data: product,
    };
  } catch {
    const errorMessage = 'Unexpected error';

    return {
      success: false,
      error: {
        type: GENERIC_API_ERRORS.UNEXPECTED,
        message: `${scope} ${errorMessage}`,
      },
    };
  }
};

export const ProductRepository = {
  findProductById,
};
