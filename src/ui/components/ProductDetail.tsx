import { useEffect, useState } from 'react';
import { Product } from '../../types/Product';
import PartCustomizer from './PartCustomizer';
import ProductSummary from './ProductSummary';
import ProductImage from './ProductImage';
import ProductInfo from './ProductInfo';
import { useCases } from '../../application/useCases/useCasesContainer';
import { Part } from '../../types/Part';
import { PartOption } from '../../types/PartOption';

const ProductDetail: React.FC = () => {
  const [product, setProduct] = useState<Product | null>(null);
  const [selectedOptions, setSelectedOptions] = useState<{
    [partId: Part['id']]: PartOption['id'];
  }>({});
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [disallowedOptions, setDisallowedOptions] = useState<PartOption['id'][]>([]);

  useEffect(() => {
    const loadProductDetails = async () => {
      const productId = Number(window.location.pathname.split('/').pop());

      const result = await useCases.findProductDetails({ productId });
      if (result.success) {
        const product = result.data;
        setProduct(product);
      }
    };

    loadProductDetails();
  }, []);

  const handleOptionChange = (partId: Part['id'], optionId: PartOption['id']) => {
    const newSelectedOptions = { ...selectedOptions, [partId]: optionId };

    const result = useCases.updateProductCustomization({
      product: product as Product,
      selectedOptions: newSelectedOptions,
    });
    if (result.success) {
      setSelectedOptions(result.data.updatedSelectedOptions);
      setDisallowedOptions(result.data.disallowedOptions);
      setTotalPrice(result.data.productTotalPrice);
    }
  };

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <ProductImage name={product.name} imageUrl={product.imageUrl} />
        <div>
          <ProductInfo name={product.name} description={product.description} type={product.type} />
          <div className="mb-6">
            {product.parts.map((part) => (
              <PartCustomizer
                key={part.id}
                part={part}
                selectedOption={selectedOptions[part.id]}
                disallowedOptions={disallowedOptions}
                onOptionChange={handleOptionChange}
              />
            ))}
          </div>
          <ProductSummary
            price={totalPrice || product.basePrice}
            isAvailableToBuy={Object.keys(selectedOptions).length >= product.parts.length}
          />
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
