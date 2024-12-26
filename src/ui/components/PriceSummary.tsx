interface PriceSummaryProps {
  price: number;
}

const PriceSummary: React.FC<PriceSummaryProps> = ({ price }) => (
  <div className="border-t pt-4">
    <p className="text-2xl font-bold">Total Price: €{price.toFixed(2)}</p>
    <button className="mt-4 bg-blue-700 text-white px-6 py-3 rounded-lg hover:bg-blue-800 transition-colors">
      Add to Cart
    </button>
  </div>
);

export default PriceSummary;
