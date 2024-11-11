import { API_BASE_URL } from "../constants";

type SearchBarProps = {
  handleProductsUpdate: (products: any) => void;
};

const SearchBar = ({ handleProductsUpdate }: SearchBarProps) => {
  const handleSearch = async (searchTerm: string) => {
    try {
      const response = await fetch(
        `${API_BASE_URL}/products?title=${searchTerm}`
      );
      const data = await response.json();
      handleProductsUpdate(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <input
        type="search"
        placeholder="Search products..."
        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none"
        onChange={(event) => handleSearch(event.target.value)}
      />
    </div>
  );
};

export default SearchBar;
