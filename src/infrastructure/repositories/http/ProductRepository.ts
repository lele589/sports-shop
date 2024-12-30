import { Product } from '../../../domain/entities/Product';
import { ResultType } from '../../../types/Generics';
import { GENERIC_API_ERRORS } from './APIErrorConstants';
import { mockProduct } from './temporalProductMock';

// Types
type findProductByIdTypes = ({ productId }: { productId: string }) => Promise<ResultType<Product>>;

// Methods
const findProductById: findProductByIdTypes = async () => {
  const scope = '[REPOSITORY/FIND_PRODUCT_BY_ID]';

  try {
    // const { data } = await fetch('https://api.example.com/product', {
    //   method: 'POST',
    //   body: JSON.stringify({ productId }),
    // });

    const product = mockProduct;

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
