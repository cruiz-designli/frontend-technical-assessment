import { Link } from "react-router-dom";

import { Product } from "../types/products";
import ProductCard from "./ProductCard";

import noResultsImage from "../assets/no-results-found.webp";

type ProductListProps = {
  data: Product[];
};

const ProductList = ({ data }: ProductListProps) => {
  if (data.length === 0) {
    return (
      <img
        src={noResultsImage}
        alt="No results found"
        width={500}
        className="mx-auto rounded-md overflow-hidden"
      />
    );
  }

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
