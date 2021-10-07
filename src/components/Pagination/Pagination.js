import React from "react";

const Pagination = ({ paginationInfo, nextPage, prevPage }) => {
  return (
    <nav>
      <ul className="pagination justify-content-center">
        {paginationInfo && paginationInfo.prev !== null ? (
          <li className="page-item">
            <button
              type="button"
              className="page-link"
              onClick={() => prevPage(paginationInfo.prev)}
            >
              Previous
            </button>
          </li>
        ) : null}
        {paginationInfo && paginationInfo.next !== null ? (
          <li className="page-item">
            <button
              type="button"
              className="page-link"
              onClick={() => nextPage(paginationInfo.next)}
            >
              Next
            </button>
          </li>
        ) : null}{" "}
      </ul>
    </nav>
  );
};

export default Pagination;
