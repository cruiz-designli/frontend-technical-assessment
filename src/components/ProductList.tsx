import { useEffect } from "react";

import { API_BASE_URL } from "../constants";
import { Product } from "../types/products";

type ProductListProps = {
  products: Product[];
  handleProductsUpdate: (products: Product[]) => void;
};

const ProductList = ({ products, handleProductsUpdate }: ProductListProps) => {
  useEffect(() => {
    const getProducts = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/products`);
        const data = await response.json();
        handleProductsUpdate(data);
      } catch (error) {
        console.error(error);
      }
    };

    getProducts();
  }, []);

  return (
    <section className="grid grid-cols-3 gap-4">
      {products.map((product) => (
        <article key={product.id} className="border rounded-lg overflow-hidden">
          <img
            src={product.images[0]}
            alt={product.title}
            className="object-cover w-full max-h-80"
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
      ))}
    </section>
  );
};

export default ProductList;
