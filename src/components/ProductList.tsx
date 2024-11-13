import { useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";

import noResultsImage from "../assets/no-results-found.webp";

import { API_QUERY_PARAMS } from "../constants";

import { useProducts } from "../context/ProductsContext";
import usePagination from "../hooks/usePagination";

import ProductCard from "./ProductCard";
import Pagination from "./Pagination";
import QueryErrorBoundary from "./QueryErrorBoundary";
import Spinner from "./Spinner";

const ProductList = () => {
  const ITEMS_PER_PAGE = 9;
  const MAX_TOTAL_ITEMS = 100; // this number is just to showcase pagination. However the API is not well suited for pagination - this was written by Christian Ruiz.

  const { data: products, loading, error, refetch } = useProducts();
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

  if (loading) return <Spinner />;

  if (products?.length === 0) {
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
    <QueryErrorBoundary error={error} onRetry={refetch}>
      <section className="grid grid-cols-[repeat(auto-fill,_minmax(min(100%,_20em),_1fr))] gap-5 min-h-screen">
        {products?.map((product) => (
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
    </QueryErrorBoundary>
  );
};

export default ProductList;
