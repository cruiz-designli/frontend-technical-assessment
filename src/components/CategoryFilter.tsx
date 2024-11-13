import { useSearchParams } from "react-router-dom";

import Spinner from "./Spinner";
import QueryErrorBoundary from "./QueryErrorBoundary";
import useFetch from "../hooks/useFetch";
import { Category } from "../types/products";
import { API_BASE_URL, API_ENDPOINTS, API_QUERY_PARAMS } from "../constants";

const CategoryFilter = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const categoryId = searchParams.get(API_QUERY_PARAMS.CATEGORY) ?? "";

  const {
    data: categories,
    loading,
    error,
    refetch,
  } = useFetch<Category[]>(`${API_BASE_URL}${API_ENDPOINTS.CATEGORIES}`);

  const handleCategoryChange = async (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const categoryId = event.target.value;

    if (!categoryId) {
      searchParams.delete(API_QUERY_PARAMS.CATEGORY);
      setSearchParams(searchParams);
      return;
    }

    searchParams.set(API_QUERY_PARAMS.CATEGORY, categoryId);
    setSearchParams(searchParams);
  };

  if (loading) return <Spinner />;

  return (
    <QueryErrorBoundary error={error} onRetry={refetch}>
      <div className="max-w-44">
        <select
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none"
          onChange={handleCategoryChange}
          value={categoryId}
        >
          <option value="">All categories</option>
          {categories?.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>
    </QueryErrorBoundary>
  );
};

export default CategoryFilter;
