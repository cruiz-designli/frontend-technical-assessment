import { useSearchParams } from "react-router-dom";
import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/16/solid";

import { getDotSteps } from "../utils/pagination";
import { API_QUERY_PARAMS } from "../constants";

interface Props {
  pageRange: (string | number)[];
  totalPages: number;
  currentPage: number;
  limit: number;
}

const Pagination = ({ pageRange, totalPages, currentPage, limit }: Props) => {
  const DOTS = "...";
  const [searchParams, setSearchParams] = useSearchParams();
  const canGoPrev = currentPage - 1 > 0;
  const canGoNext = currentPage + 1 <= totalPages;

  const handleGoBack = () => {
    if (!canGoPrev) return;
    updatePage((currentPage -= 1));
  };

  const handleGoNext = () => {
    if (!canGoNext) return;
    updatePage((currentPage += 1));
  };

  const handlePageClick = (page: number | string, index: number) => {
    if (page === currentPage) return;

    let dotSteps;
    if (page === DOTS) {
      dotSteps = getDotSteps({ pageRange, index, stepSize: 2 });
    }
    const actualPage = page === DOTS && dotSteps ? dotSteps : Number(page);
    updatePage(actualPage);
  };

  const updatePage = (updatedPage: number) => {
    searchParams.set(API_QUERY_PARAMS.OFFSET, `${(updatedPage - 1) * limit}`);
    searchParams.set(API_QUERY_PARAMS.LIMIT, `${limit}`);
    setSearchParams(searchParams);
  };

  return (
    <section className="flex justify-center items-center space-x-4 px-4 py-8">
      <button
        onClick={handleGoBack}
        className={!canGoPrev ? "cursor-not-allowed" : ""}
        disabled={!canGoPrev}
      >
        <ArrowLeftIcon className="w-6 text-gray-600 cursor-pointer" />
      </button>

      <div className="flex items-center space-x-2">
        {pageRange?.map((item, index) => (
          <button
            key={`${item}-${index}`}
            type="button"
            onClick={() => handlePageClick(item, index)}
            className={currentPage === item ? "text-yellow-500 font-bold" : ""}
          >
            {item}
          </button>
        ))}
      </div>
      <button
        onClick={handleGoNext}
        className={!canGoNext ? "cursor-not-allowed" : ""}
        disabled={!canGoNext}
      >
        <ArrowRightIcon className="w-6 text-gray-600 cursor-pointer" />
      </button>
    </section>
  );
};

export default Pagination;
