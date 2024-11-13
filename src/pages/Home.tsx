import { useLocation } from "react-router-dom";

import {
  ProductList,
  Filters,
  Spinner,
  QueryErrorBoundary,
} from "../components";
import { Product } from "../types/products";
import useFetch from "../hooks/useFetch";
import { API_BASE_URL } from "../constants";

const Home = () => {
  const location = useLocation();
  const { search } = location;
  const { data, loading, error, refetch } = useFetch<Product[]>(
    `${API_BASE_URL}/products/${search}`
  );

  if (loading) return <Spinner />;

  return (
    <QueryErrorBoundary error={error} onRetry={refetch}>
      <div className="container mx-auto p-4 space-y-6">
        <Filters />
        <ProductList data={data || []} />
      </div>
    </QueryErrorBoundary>
  );
};

export default Home;
