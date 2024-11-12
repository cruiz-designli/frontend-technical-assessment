const API_BASE_URL = "https://api.escuelajs.co/api/v1";

const ROUTES = {
  HOME: "/",
  PRODUCTS: "/products",
  PRODUCT_DETAIL: "/products/:id",
};

enum API_QUERY_PARAMS {
  CATEGORY = "categoryId",
  PRICE_MIN = "price_min",
  PRICE_MAX = "price_max",
  TITLE = "title",
}

export { API_BASE_URL, ROUTES, API_QUERY_PARAMS };
