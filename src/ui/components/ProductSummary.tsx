interface ProductSummaryProps {
  price: number;
  isAvailableToBuy: boolean;
}

const ProductSummary: React.FC<ProductSummaryProps> = ({ price, isAvailableToBuy }) => {
  const styleDisabledButton = !isAvailableToBuy ? 'opacity-30' : '';

  const handleClick = () => {
    console.log('Added to cart');
  };

  return (
    <div className="border-t pt-4">
      <p className="text-2xl font-bold ${}">Total Price: €{price.toFixed(2)}</p>
      <button
        className={`mt-4 bg-blue-700 text-white px-6 py-3 rounded-lg hover:bg-blue-800 transition-colors ${styleDisabledButton}`}
        disabled={!isAvailableToBuy}
        onClick={handleClick}
      >
        Add to Cart
      </button>
    </div>
  );
};

export default ProductSummary;
