import { useNavigate, useParams } from "react-router-dom";

import { ProductCard, QueryErrorBoundary, Spinner } from "../components";
import useFetch from "../hooks/useFetch";
import { Product } from "../types/products";
import { API_BASE_URL, ROUTES } from "../constants";

const Detail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const {
    data: product,
    loading,
    error,
    refetch,
  } = useFetch<Product | null>(`${API_BASE_URL}/products/${id}`);

  if (loading) return <Spinner />;

  return (
    <QueryErrorBoundary error={error} onRetry={refetch}>
      <div className="max-w-2xl mx-auto">
        <div className="flex items-start gap-6">
          <button
            className="text-blue-500"
            onClick={() => navigate(ROUTES.HOME)}
          >
            Back
          </button>
          {product && <ProductCard product={product} />}
        </div>
      </div>
    </QueryErrorBoundary>
  );
};

export default Detail;
