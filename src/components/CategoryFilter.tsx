import { API_BASE_URL, API_QUERY_PARAMS } from "../constants";
import { Category } from "../types/products";
import useFetch from "../hooks/useFetch";
import { useSearchParams } from "react-router-dom";

const CategoryFilter = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const categoryId = searchParams.get(API_QUERY_PARAMS.CATEGORY) ?? "";

  const { data: categories, error } = useFetch<Category[]>(
    `${API_BASE_URL}/categories`
  );

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

  if (!categories) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-44">
      <select
        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none"
        onChange={handleCategoryChange}
        value={categoryId}
      >
        <option value="">All categories</option>
        {categories.map((category) => (
          <option key={category.id} value={category.id}>
            {category.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CategoryFilter;
