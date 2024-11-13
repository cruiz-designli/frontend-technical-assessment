import { Product } from "../types/products";
import placeholderImage from "../assets/placeholder-image.jpg";
import { cleanImageUrl } from "../utils/cleanImgUrls";

type ProductCardProps = {
  product: Product;
};

const ProductCard = ({ product }: ProductCardProps) => (
  <article className="border rounded-lg overflow-hidden ">
    <img
      src={cleanImageUrl(product.images[0])}
      alt={product.title}
      className="object-cover w-full"
      onError={(e) => {
        e.currentTarget.src = placeholderImage;
      }}
    />
    <div className="p-4 space-y-2 text-left">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">{product.title}</h2>
        <div className="text-sm text-gray-500 bg-slate-50 px-2 py-1 rounded-full">
          {product.category.name}
        </div>
      </div>
      <p className="text-sm text-gray-500">{product.description}</p>
      <p className="text-lg font-bold">${product.price}</p>
    </div>
  </article>
);

export default ProductCard;
