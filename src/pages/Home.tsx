import { useLocation } from "react-router-dom";

import { ProductList, Filters, Spinner } from "../components";
import { Product } from "../types/products";
import useFetch from "../hooks/useFetch";
import { API_BASE_URL } from "../constants";

const Home = () => {
  const location = useLocation();
  const { search } = location;
  const { data, error } = useFetch<Product[]>(
    `${API_BASE_URL}/products/${search}`
  );

  if (!data) return <Spinner />;

  return (
    <>
      <h1>Products</h1>
      <div className="container mx-auto p-4 space-y-6">
        <Filters />
        <ProductList data={data} />
      </div>
    </>
  );
};

export default Home;
