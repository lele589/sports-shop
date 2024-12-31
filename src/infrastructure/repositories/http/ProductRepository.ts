import { Product } from '../../../types/Product';
import { ResultType } from '../../../types/Generics';
import { GENERIC_API_ERRORS } from './APIErrorConstants';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// Types
type findProductByIdTypes = ({ productId }: { productId: number }) => Promise<ResultType<Product>>;

// Methods
const findProductById: findProductByIdTypes = async ({ productId }) => {
  const scope = '[REPOSITORY/FIND_PRODUCT_BY_ID]';

  try {
    const response = await fetch(`${API_BASE_URL}/product/${productId}`, {
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

export const productRepository = {
  findProductById,
};
