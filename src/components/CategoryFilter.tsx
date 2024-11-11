import { useEffect, useState } from "react";

import { API_BASE_URL } from "../constants";
import { Category } from "../types/products";

type CategoryFilterProps = {
  handleProductsUpdate: (products: any) => void;
};

const CategoryFilter = ({ handleProductsUpdate }: CategoryFilterProps) => {
  const [categories, setCategories] = useState<Category[]>([]);

  const cleanCategories = (categories: Category[]) => {
    return categories.filter(
      (category, index, self) =>
        index === self.findIndex((t) => t.name === category.name)
    );
  };

  const handleCategoryChange = async (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const categoryId = event.target.value;
    try {
      const response = await fetch(
        `${API_BASE_URL}/products?categoryId=${categoryId}`
      );
      const data = await response.json();
      handleProductsUpdate(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const getCategories = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/categories`);
        const data: Category[] = await response.json();

        const cleanedCategories = cleanCategories(data);
        setCategories(cleanedCategories);
      } catch (error) {
        console.error(error);
      }
    };

    getCategories();
  }, []);

  return (
    <div className="max-w-44">
      <select
        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none"
        onChange={handleCategoryChange}
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
