import { useEffect, useReducer, useRef, useCallback } from "react";

interface State<T> {
  data?: T;
  error?: Error;
  loading: boolean;
}

type Cache<T> = { [url: string]: T };

// Discriminated union type
type Action<T> =
  | { type: "loading" }
  | { type: "fetched"; payload: T }
  | { type: "error"; payload: Error };

function useFetch<T = unknown>(
  url?: string,
  options?: RequestInit
): State<T> & { refetch: () => void } {
  const cache = useRef<Cache<T>>({});

  // Used to prevent state update if the component is unmounted
  const cancelRequest = useRef<boolean>(false);

  const initialState: State<T> = {
    error: undefined,
    data: undefined,
    loading: false, // Initial loading state
  };

  // Reducer function for handling state transitions
  const fetchReducer = (state: State<T>, action: Action<T>): State<T> => {
    switch (action.type) {
      case "loading":
        return { ...state, loading: true }; // Set loading to true when starting the fetch
      case "fetched":
        return { ...state, data: action.payload, loading: false }; // Set loading to false when data is fetched
      case "error":
        return { ...state, error: action.payload, loading: false }; // Set loading to false when there's an error
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(fetchReducer, initialState);

  // Fetch function that is triggered when needed
  const fetchData = useCallback(async () => {
    // Do nothing if the url is not given
    if (!url) return;

    dispatch({ type: "loading" });

    // If a cache exists for this url, return it
    if (cache.current[url]) {
      dispatch({ type: "fetched", payload: cache.current[url] });
      return;
    }

    try {
      const response = await fetch(url, options);
      if (!response.ok) {
        throw new Error(response.statusText);
      }

      const data = (await response.json()) as T;
      cache.current[url] = data;
      if (cancelRequest.current) return;

      dispatch({ type: "fetched", payload: data });
    } catch (error) {
      if (cancelRequest.current) return;
      dispatch({ type: "error", payload: error as Error });
    }
  }, [url, options]);

  // Trigger the fetchData on initial render or when the URL changes
  useEffect(() => {
    cancelRequest.current = false;
    void fetchData();

    // Cleanup function to prevent state update if component is unmounted
    return () => {
      cancelRequest.current = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url, options, fetchData]);

  // Return the state along with the refetch function
  return { ...state, refetch: fetchData };
}

export default useFetch;
