import { Link, useSearchParams } from "react-router-dom";

import { Product } from "../types/products";
import ProductCard from "./ProductCard";

import noResultsImage from "../assets/no-results-found.webp";
import usePagination from "../hooks/usePagination";
import { API_QUERY_PARAMS } from "../constants";
import Pagination from "./Pagination";
import { useEffect } from "react";

type ProductListProps = {
  data: Product[];
};

const ProductList = ({ data }: ProductListProps) => {
  const ITEMS_PER_PAGE = 9;
  const MAX_TOTAL_ITEMS = 100; // this number is just to showcase pagination since the API is not well suited for pagination - this was written by Christian.

  const [searchParams, setSearchParams] = useSearchParams();
  const offset = parseInt(searchParams.get(API_QUERY_PARAMS.OFFSET) ?? "0", 10);
  const limit = parseInt(
    searchParams.get(API_QUERY_PARAMS.LIMIT) ?? ITEMS_PER_PAGE.toString(),
    10
  );

  const totalPages = Math.ceil(MAX_TOTAL_ITEMS / limit);
  const currentPage = Math.ceil(offset / limit) + 1;

  const { paginationRange } = usePagination({
    activePage: currentPage,
    pageNumber: totalPages,
  });

  useEffect(() => {
    searchParams.set(API_QUERY_PARAMS.OFFSET, `${(currentPage - 1) * limit}`);
    searchParams.set(API_QUERY_PARAMS.LIMIT, `${limit}`);
    setSearchParams(searchParams);
  }, []);

  if (data.length === 0) {
    return (
      <img
        src={noResultsImage}
        alt="No results found"
        width={500}
        className="mx-auto rounded-md overflow-hidden"
      />
    );
  }

  return (
    <div>
      <section className="grid grid-cols-[repeat(auto-fill,_minmax(min(100%,_20em),_1fr))] gap-5 min-h-screen">
        {data.map((product) => (
          <Link to={`/products/${product.id}`} key={product.id}>
            <ProductCard product={product} />
          </Link>
        ))}
      </section>
      <Pagination
        pageRange={paginationRange || []}
        totalPages={totalPages}
        currentPage={currentPage}
        limit={limit}
      />
    </div>
  );
};

export default ProductList;
