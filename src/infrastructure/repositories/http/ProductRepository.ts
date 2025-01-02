import { GENERIC_API_ERRORS } from './APIErrorConstants';
import { ProductRepository } from '../../../domain/repositories/ProductRepository';
import { Product } from '../../../types/Product';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const findProductById = async ({ productId }: { productId: Product['id'] }) => {
  const scope = '[REPOSITORY/FIND_PRODUCT_BY_ID]';

  try {
    const response = await fetch(`${API_BASE_URL}/product/${productId}`, {
      method: 'GET',
    });

    const parsedProductResponse = await response.json();
    const product: Product = parsedProductResponse.data;

    return {
      success: true as const,
      data: product,
    };
  } catch {
    const errorMessage = 'Unexpected error';

    return {
      success: false as const,
      error: {
        type: GENERIC_API_ERRORS.UNEXPECTED,
        message: `${scope} ${errorMessage}`,
      },
    };
  }
};

export const productRepository: ProductRepository = {
  findProductById,
};
