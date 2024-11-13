const API_BASE_URL = "https://api.escuelajs.co/api/v1";

enum API_QUERY_PARAMS {
  CATEGORY = "categoryId",
  PRICE_MIN = "price_min",
  PRICE_MAX = "price_max",
  TITLE = "title",
}

const API_ENDPOINTS = {
  PRODUCTS: "/products",
  PRODUCT: (id: string) => `/products/${id}`,
  CATEGORIES: "/categories",
};

export { API_BASE_URL, API_QUERY_PARAMS, API_ENDPOINTS };
