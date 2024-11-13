import React, { createContext, useContext } from "react";
import { useLocation } from "react-router-dom";

import useFetch from "../hooks/useFetch";
import { Product } from "../types/products";
import { API_BASE_URL, API_ENDPOINTS } from "../constants";

interface ProductsContextType {
  data: Product[] | null;
  loading: boolean;
  error: any;
  refetch: () => void;
}

const ProductsContext = createContext<ProductsContextType | undefined>(
  undefined
);

export const ProductsProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const location = useLocation();
  const { search } = location;
  const { data, loading, error, refetch } = useFetch<Product[]>(
    `${API_BASE_URL}${API_ENDPOINTS.PRODUCTS}${search}`
  );

  const contextValue = React.useMemo(
    () => ({
      data: data ?? null,
      loading,
      error,
      refetch,
    }),
    [data, loading, error, refetch]
  );

  return (
    <ProductsContext.Provider value={contextValue}>
      {children}
    </ProductsContext.Provider>
  );
};

export const useProducts = (): ProductsContextType => {
  const context = useContext(ProductsContext);
  if (!context) {
    throw new Error("useProducts must be used within a ProductsProvider");
  }
  return context;
};
