import { Product } from "../types/products";
import { Link } from "react-router-dom";
import ProductCard from "./ProductCard";

type ProductListProps = {
  data: Product[];
};

const ProductList = ({ data }: ProductListProps) => {
  return (
    <section className="grid grid-cols-[repeat(auto-fill,_minmax(min(100%,_20em),_1fr))] gap-5 min-h-screen">
      {data.map((product) => (
        <Link to={`/products/${product.id}`} key={product.id}>
          <ProductCard product={product} />
        </Link>
      ))}
    </section>
  );
};

export default ProductList;
