import React, { useState } from "react";

import {
  CategoryFilter,
  PriceRangeFilter,
  ProductList,
  SearchBar,
} from "../components";
import { Product } from "../types/products";

const Home = () => {
  const [products, setProducts] = useState<Product[]>([]);

  const handleProductsUpdate = (products: Product[]) => setProducts(products);
  return (
    <>
      <h1>Products</h1>
      <div className="container mx-auto p-4 space-y-6">
        <div className="flex justify-end gap-4">
          <CategoryFilter handleProductsUpdate={handleProductsUpdate} />
          <PriceRangeFilter handleProductsUpdate={handleProductsUpdate} />
        </div>
        <SearchBar handleProductsUpdate={handleProductsUpdate} />
        <ProductList
          products={products}
          handleProductsUpdate={handleProductsUpdate}
        />
      </div>
    </>
  );
};

export default Home;
