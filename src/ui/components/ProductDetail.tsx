import { useState } from 'react';
import { Product } from '../../domain/entities/Product';
import PartCustomizer from './PartCustomizer';
import PriceSummary from './PriceSummary';
import ProductImage from './ProductImage';
import ProductInfo from './ProductInfo';
import { useCases } from '../../application/useCases/useCasesContainer';

const exampleProduct: Product = {
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
      id: '1',
      name: 'Part 1',
      options: [
        { id: '1', name: 'Option 1', additionalPrice: 0, available: true },
        { id: '2', name: 'Option 2', additionalPrice: 10, available: true },
        { id: '3', name: 'Option 3', additionalPrice: 20, available: true },
      ],
    },
    {
      id: '2',
      name: 'Part 2',
      options: [
        { id: '4', name: 'Option 4', additionalPrice: 0, available: true },
        { id: '5', name: 'Option 5', additionalPrice: 15, available: true },
      ],
    },
  ],
  imageUrl: 'https://placehold.co/600x400',
  dependencies: [
    {
      optionId: '2',
      disallowedOptionIds: ['4'],
    },
    {
      optionId: '5',
      disallowedOptionIds: ['2', '3'],
    },
  ],
};

const ProductDetail: React.FC = () => {
  const [selectedOptions, setSelectedOptions] = useState<{ [partId: string]: string }>({});
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [disallowedOptions, setDisallowedOptions] = useState<string[]>([]);

  const handleOptionChange = (partId: string, optionId: string) => {
    const newSelectedOptions = { ...selectedOptions, [partId]: optionId };

    const result = useCases.updateProductCustomization({
      product: exampleProduct,
      selectedOptions: newSelectedOptions,
    });
    if (result.success) {
      setSelectedOptions(result.data.updatedSelectedOptions);
      setDisallowedOptions(result.data.disallowedOptions);
      setTotalPrice(result.data.productTotalPrice);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <ProductImage name={exampleProduct.name} imageUrl={exampleProduct.imageUrl} />
        <div>
          <ProductInfo
            name={exampleProduct.name}
            description={exampleProduct.description}
            type={exampleProduct.type}
          />
          <div className="mb-6">
            {exampleProduct.parts.map((part) => (
              <PartCustomizer
                key={part.id}
                part={part}
                selectedOption={selectedOptions[part.id]}
                disallowedOptions={disallowedOptions}
                onOptionChange={handleOptionChange}
              />
            ))}
          </div>
          <PriceSummary price={totalPrice || exampleProduct.basePrice} />
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
