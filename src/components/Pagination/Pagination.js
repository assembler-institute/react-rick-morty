import React from "react";

const Pagination = ({ onPrevious, onNext, paginationInfo }) => {
  const handlePrev = () => {
    console.log("click");
  };

  const handleNext = () => {
    console.log("click");
  };

  return (
    <nav>
      <ul className="pagination justify-content-center">
        {paginationInfo.prev ? (
          <li className="page-item">
            <button type="button" className="page-link" onClick={handlePrev}>
              Previous
            </button>
          </li>
        ) : null}
        {paginationInfo.next ? (
          <li className="page-item">
            <button type="button" className="page-link" onClick={handleNext}>
              Next
            </button>
          </li>
        ) : null}
      </ul>
    </nav>
  );
};

export default Pagination;
