import { API_BASE_URL } from "../constants";

type PriceRangeFilterProps = {
  handleProductsUpdate: (products: any) => void;
};

const PriceRangeFilter = ({ handleProductsUpdate }: PriceRangeFilterProps) => {
  const handleRangeUpdate = async (range: string) => {
    try {
      const response = await fetch(
        `${API_BASE_URL}/products?price_min=10&price_max=${range}`
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
        type="range"
        min="1"
        max="100"
        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none"
        onChange={(event) => handleRangeUpdate(event.target.value)}
      />
    </div>
  );
};

export default PriceRangeFilter;
