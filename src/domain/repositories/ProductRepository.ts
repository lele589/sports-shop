import { ResultType } from '../../types/Generics';
import { Product } from '../../types/Product';

export interface ProductRepository {
  findProductById({ productId }: { productId: Product['id'] }): Promise<ResultType<Product>>;
}
