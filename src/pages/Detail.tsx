import { useNavigate, useParams } from "react-router-dom";
import { ArrowUturnLeftIcon } from "@heroicons/react/16/solid";

import { ProductCard, QueryErrorBoundary, Spinner } from "../components";
import useFetch from "../hooks/useFetch";
import { Product } from "../types/products";
import { API_BASE_URL, API_ENDPOINTS, ROUTES } from "../constants";

const Detail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const {
    data: product,
    loading,
    error,
    refetch,
  } = useFetch<Product | null>(
    id ? `${API_BASE_URL}${API_ENDPOINTS.PRODUCT(id)}` : ""
  );

  if (loading) return <Spinner />;

  return (
    <QueryErrorBoundary error={error} onRetry={refetch}>
      <div className="max-w-2xl mx-auto">
        <div className="flex items-start gap-6">
          <div>
            <ArrowUturnLeftIcon
              onClick={() => navigate(ROUTES.HOME)}
              className="w-6 text-gray-600 cursor-pointer"
            />
          </div>
          {product && <ProductCard product={product} />}
        </div>
      </div>
    </QueryErrorBoundary>
  );
};

export default Detail;
