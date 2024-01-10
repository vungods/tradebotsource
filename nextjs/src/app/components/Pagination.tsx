import React from 'react';

const Pagination = ({ currentPage, totalPages, onPageChange }: { currentPage: number, totalPages: number, onPageChange: Function }) => {
  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === totalPages;

  const handlePageChange = (newPage: number) => {
    if (newPage < 1 || newPage > totalPages) return;
    onPageChange(newPage);
  };

  return (
    <div className="flex items-center justify-center mt-6">
      <button
        className={`mr-2 px-3 py-1 rounded-md ${
          isFirstPage ? 'bg-gray-200 cursor-not-allowed' : 'bg-gray-400 hover:bg-gray-500'
        }`}
        onClick={() => handlePageChange(1)}
        disabled={isFirstPage}
      >
        {`<<`}
      </button>
      <button
        className={`mr-2 px-3 py-1 rounded-md ${
          isFirstPage ? 'bg-gray-200 cursor-not-allowed' : 'bg-gray-400 hover:bg-gray-500'
        }`}
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={isFirstPage}
      >
        {`<`}
      </button>
      <span className="px-3 py-1 rounded-md bg-gray-200">{currentPage}/{totalPages}</span>
      <button
        className={`ml-2 px-3 py-1 rounded-md ${
          isLastPage ? 'bg-gray-200 cursor-not-allowed' : 'bg-gray-400 hover:bg-gray-500'
        }`}
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={isLastPage}
      >
        {`>`}
      </button>
      <button
        className={`ml-2 px-3 py-1 rounded-md ${
          isLastPage ? 'bg-gray-200 cursor-not-allowed' : 'bg-gray-400 hover:bg-gray-500'
        }`}
        onClick={() => handlePageChange(totalPages)}
        disabled={isLastPage}
      >
        {`>>`}
      </button>
    </div>
  );
};

export default Pagination;
