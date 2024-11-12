import { useNavigate, useParams } from "react-router-dom";

import { ProductCard, Spinner } from "../components";
import useFetch from "../hooks/useFetch";
import { Product } from "../types/products";
import { API_BASE_URL, ROUTES } from "../constants";

const Detail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: product, error } = useFetch<Product | null>(
    `${API_BASE_URL}/products/${id}`
  );

  if (!product) return <Spinner />;

  return (
    <div className="max-w-2xl mx-auto">
      <div className="flex items-start gap-6">
        <button className="text-blue-500" onClick={() => navigate(ROUTES.HOME)}>
          Back
        </button>
        <ProductCard product={product} />
      </div>
    </div>
  );
};

export default Detail;
