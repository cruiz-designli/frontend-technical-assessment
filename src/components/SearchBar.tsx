import { useLocation, useSearchParams } from "react-router-dom";
import { API_QUERY_PARAMS } from "../constants";
import { debounce } from "lodash";
import { useCallback, useState } from "react";

const SearchBar = () => {
  const { pathname } = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const inputValue = searchParams.get(API_QUERY_PARAMS.TITLE) || "";
  const [searchValue, setSearchValue] = useState(inputValue);

  const debouncedHandleSearch = useCallback(
    debounce((value) => {
      if (value === "") {
        searchParams.delete(API_QUERY_PARAMS.TITLE);
        return setSearchParams(searchParams);
      }
      setSearchParams({ [API_QUERY_PARAMS.TITLE]: value });
    }, 600),
    [pathname]
  );

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    setSearchValue(inputValue);
    debouncedHandleSearch(inputValue);
  };

  return (
    <div className="w-full">
      <input
        type="search"
        placeholder="Search for products..."
        value={searchValue}
        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none"
        onChange={handleSearch}
      />
    </div>
  );
};

export default SearchBar;
