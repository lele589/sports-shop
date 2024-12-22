interface ProductImageProps {
  name: string;
  imageUrl: string;
}

const ProductImage: React.FC<ProductImageProps> = ({ name, imageUrl }) => (
  <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg">
    <img
      src={imageUrl}
      alt={name}
      className="object-cover"
      sizes="(max-width: 768px) 100vw, 50vw"
    />
  </div>
);

export default ProductImage;
