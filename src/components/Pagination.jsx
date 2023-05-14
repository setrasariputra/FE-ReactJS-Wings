import React from "react";

export default function Pagination(props) {
  const pageNumbers = [];
  const currentPage = props.currentPage;
  const totalPages = props.totalPages;

  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  function pageChange(pageNumber) {
    props.onHandlePageChange(pageNumber)
  }

  const renderPageNumbers = pageNumbers.map((number) => {
    return (
      <li
        key={number}
        className={`${
          currentPage === number ? "bg-indigo-500 text-white" : "bg-white"
        } border px-3 py-1 cursor-pointer`}
        onClick={() => pageChange(number)}
      >
        {number}
      </li>
    );
  });

  return (
    <div>
      <ul className="flex">
        {currentPage > 1 && (
          <li
            className="bg-white border mx-1 px-3 py-1 cursor-pointer"
            onClick={() => pageChange(currentPage - 1)}
          >
            Prev
          </li>
        )}

        {renderPageNumbers}

        {currentPage < totalPages && (
          <li
            className="bg-white border mx-1 px-3 py-1 cursor-pointer"
            onClick={() => pageChange(currentPage + 1)}
          >
            Next
          </li>
        )}
      </ul>
    </div>
  );
}
