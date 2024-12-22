import { Product } from '../../domain/entities/Product';
import ProductImage from './ProductImage';
import ProductInfo from './ProductInfo';

const mockProduct: Product = {
  id: '1',
  name: 'Bicycle A-125',
  description:
    'This bicycle is designed for road riding, offering a smooth and efficient ride on paved surfaces. It features lightweight materials and aerodynamic design to enhance speed and performance, making it ideal for long-distance rides and competitive cycling.',
  type: 'bicycle',
  basePrice: 1000,
  inStock: true,
  creationDate: new Date(),
  parts: [
    {
      id: 'part-1',
      name: 'Part 1',
      options: [
        { id: 'option-1', name: 'Option 1', additionalPrice: 0, available: true },
        { id: 'option-2', name: 'Option 2', additionalPrice: 10, available: true },
        { id: 'option-3', name: 'Option 3', additionalPrice: 20, available: true },
      ],
    },
    {
      id: 'part-2',
      name: 'Part 2',
      options: [
        { id: 'option-4', name: 'Option 4', additionalPrice: 0, available: true },
        { id: 'option-5', name: 'Option 5', additionalPrice: 15, available: true },
      ],
    },
  ],
  imageUrl: 'https://placehold.co/600x400',
};

const ProductDetail: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <ProductImage name={mockProduct.name} imageUrl={mockProduct.imageUrl} />
        <div>
          <ProductInfo
            name={mockProduct.name}
            description={mockProduct.description}
            type={mockProduct.type}
          />
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
