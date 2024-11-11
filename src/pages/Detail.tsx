import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { API_BASE_URL, ROUTES } from "../constants";
import { Product } from "../types/products";

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

  return (
    <div className="max-w-2xl mx-auto">
      <div className="flex items-start gap-6">
        <button className="text-blue-500" onClick={() => navigate(ROUTES.HOME)}>
          Back
        </button>
        <article className="border rounded-lg overflow-hidden">
          <img
            src={product?.images[0]}
            alt={product?.title}
            className="object-cover w-full max-h-80"
          />
          <div className="p-4 space-y-2 text-left">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold">{product?.title}</h2>
              <div className="text-sm text-gray-500 bg-slate-50 px-2 py-1 rounded-full">
                {product?.category.name}
              </div>
            </div>
            <p className="text-sm text-gray-500">{product?.description}</p>
            <p className="text-lg font-bold">${product?.price}</p>
          </div>
        </article>
      </div>
    </div>
  );
};

export default Detail;
