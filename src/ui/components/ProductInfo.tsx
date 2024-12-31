import { ProductType } from '../../types/Product';

interface ProductInfoProps {
  name: string;
  description: string;
  type: ProductType;
}

const ProductInfo: React.FC<ProductInfoProps> = ({ name, description, type }) => (
  <div>
    <h1 className="text-3xl font-bold mb-6">{name}</h1>
    <p className="text-gray-600 mb-4">{description}</p>
    <h2 className="text-2xl font-semibold mb-4">Customize your {type}</h2>
  </div>
);

export default ProductInfo;
