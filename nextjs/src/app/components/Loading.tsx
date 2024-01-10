import React from "react";

interface LoadingProps {
  isLoading: boolean;
}

const Loading: React.FC<LoadingProps> = ({ isLoading }) => {
  return (
    <>
      {isLoading && (
        <div className="fixed top-0 left-0 z-50 w-full h-full flex items-center justify-center bg-opacity-50 bg-gray-900">
          <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-300"></div>
        </div>
      )}
    </>
  );
};
export default Loading;
