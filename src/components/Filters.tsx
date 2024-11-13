import { useState } from "react";
import { useSearchParams } from "react-router-dom";

import CategoryFilter from "./CategoryFilter";
import PriceRangeFilter from "./PriceRangeFilter";
import SearchBar from "./SearchBar";
import { API_QUERY_PARAMS } from "../constants";

const Filters = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const priceMin = searchParams.get(API_QUERY_PARAMS.PRICE_MIN);
  const priceMax = searchParams.get(API_QUERY_PARAMS.PRICE_MAX);

  const isChecked = !!priceMin || !!priceMax;

  const MAXIMUM_PRICE = 650;

  const [shouldBeFilteredByPrice, setShouldBeFilteredByPrice] =
    useState(isChecked);

  const handlePriceFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const isCheked = e.target.checked;
    if (!isCheked) {
      searchParams.delete(API_QUERY_PARAMS.PRICE_MIN);
      searchParams.delete(API_QUERY_PARAMS.PRICE_MAX);
      setSearchParams(searchParams);
    }

    setShouldBeFilteredByPrice((prev) => !prev);
  };
  return (
    <section className="space-y-4 mb-8">
      <div className="flex items-center gap-4">
        <SearchBar />
        <CategoryFilter />
      </div>
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <label htmlFor="price">Filter by price</label>
          <input
            type="checkbox"
            id="price"
            name="price"
            value="price"
            checked={shouldBeFilteredByPrice}
            onChange={handlePriceFilterChange}
          />
        </div>
        <div className="flex-1">
          {shouldBeFilteredByPrice && (
            <PriceRangeFilter
              initialRange={[
                Number(priceMin),
                Number(priceMax) || MAXIMUM_PRICE,
              ]}
            />
          )}
        </div>
      </div>
    </section>
  );
};

export default Filters;
