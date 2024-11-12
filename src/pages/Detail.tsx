import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { API_BASE_URL, ROUTES } from "../constants";
import { Product } from "../types/products";
import ProductCard from "../components/ProductCard";

const Detail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!id) return;
    const getProductById = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/products/${id}`);
        const data = await response.json();
        setProduct(data);
      } catch (error) {
        console.error(error);
      }
    };
    getProductById();
  }, [id]);

  if (!product) {
    return <div>Loading</div>;
  }

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
