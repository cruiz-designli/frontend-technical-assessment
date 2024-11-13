import React from "react";
import { useNavigate } from "react-router-dom";
import { ExclamationCircleIcon } from "@heroicons/react/16/solid";

interface QueryErrorBoundaryProps {
  error?: Error;
  children: React.ReactNode;
  onRetry?: () => void;
}

const QueryErrorBoundary: React.FC<QueryErrorBoundaryProps> = ({
  error,
  children,
  onRetry,
}) => {
  const navigate = useNavigate();

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-full p-8 bg-white border border-gray-200 rounded-lg shadow-sm animate-fadeIn">
        <ExclamationCircleIcon className="w-16 h-16 text-red-600 mb-4" />
        <h2 className="text-lg font-semibold text-gray-800 mb-2">
          {error.message
            ? "Failed to Fetch Data"
            : "An Unexpected Error Occurred"}
        </h2>
        <p className="text-sm text-gray-600 mb-6">
          {error.message ||
            "Please try again or contact support if the problem persists."}
        </p>
        <div className="flex space-x-3">
          <button
            onClick={onRetry || (() => navigate(0))}
            className="px-5 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md shadow transition duration-150"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};

export default QueryErrorBoundary;
