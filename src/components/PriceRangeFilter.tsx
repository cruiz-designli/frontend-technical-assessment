import { Range } from "react-range";
import { API_QUERY_PARAMS } from "../constants";
import { useLocation, useSearchParams } from "react-router-dom";
import { useCallback, useState } from "react";
import { debounce } from "lodash";

type PriceRangeFilterProps = {
  initialRange: number[];
};

const PriceRangeFilter = ({ initialRange }: PriceRangeFilterProps) => {
  const { pathname } = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();

  const [values, setValues] = useState(initialRange);

  const debouncedHandleSearch = useCallback(
    debounce((value) => {
      searchParams.set(API_QUERY_PARAMS.PRICE_MIN, String(value[0]));
      searchParams.set(API_QUERY_PARAMS.PRICE_MAX, String(value[1]));
      setSearchParams(searchParams);
    }, 600),
    [pathname]
  );

  const handleRangeUpdate = async (range: number[]) => {
    setValues(range);
    debouncedHandleSearch(range);
  };

  return (
    <div className="relative">
      <Range
        step={1}
        min={0}
        max={650}
        values={values}
        onChange={(newValues) => handleRangeUpdate(newValues)}
        renderTrack={({ props, children }) => (
          <div
            {...props}
            style={{
              height: "4px",
              width: "100%",
              background: "#ddd",
              borderRadius: "4px",
              position: "relative",
            }}
          >
            <div
              style={{
                position: "absolute",
                height: "100%",
                width: `${((values[1] - values[0]) / 650) * 100}%`,
                left: `${(values[0] / 650) * 100}%`,
                background: "#548BF4",
                borderRadius: "4px",
              }}
            />
            {children}
          </div>
        )}
        renderThumb={({ props, index }) => (
          <div
            {...props}
            style={{
              height: "24px",
              width: "24px",
              backgroundColor: "#548BF4",
              borderRadius: "50%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              border: "2px solid white",
              boxShadow: "0px 0px 3px rgba(0,0,0,0.2)",
            }}
          >
            <span style={{ color: "white", fontSize: "12px" }}>
              {values[index]}
            </span>
          </div>
        )}
      />
    </div>
  );
};

export default PriceRangeFilter;
