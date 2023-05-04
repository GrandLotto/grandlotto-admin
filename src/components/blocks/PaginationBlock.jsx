import React, { useEffect, useState } from "react";

const PaginationBlock = ({
  handlePrev,
  handleNext,
  page,
  totalPages,
  handleFetchByPage,
}) => {
  const [displablePrev, setdisplablePrev] = useState(false);
  const [displableNext, setdisplableNext] = useState(false);
  const [totalDisplayPages, setTotalDisplayPages] = useState([]);

  const previous = () => {
    if (displablePrev) {
      return;
    }

    handlePrev();
  };

  const next = () => {
    if (displableNext) {
      return;
    }

    handleNext();
  };

  const fetchByPage = (newPage) => {
    if (page === newPage) {
      return;
    }
    // console.log(newPage);

    handleFetchByPage(newPage);
  };

  useEffect(() => {
    if (page === totalPages) {
      setdisplableNext(true);
    } else {
      setdisplableNext(false);
    }
    if (page === 1) {
      setdisplablePrev(true);
    } else {
      setdisplablePrev(false);
    }

    let newPages = [];

    for (let index = 0; index < totalPages; index++) {
      newPages.push(index);
    }

    setTotalDisplayPages(newPages);
  }, [page, totalPages]);

  return (
    <div className="d-flex justify-content-between align-items-center px-4 mt-3 mb-3 border-top pt-3">
      <p>
        Page {page} of {totalPages}{" "}
      </p>
      <nav aria-label="Page navigation example">
        <ul className="pagination">
          <li
            className={`page-item  ${displablePrev ? "disabled" : ""}`}
            onClick={() => previous()}
          >
            <a
              className="page-link"
              href="true"
              onClick={(e) => e.preventDefault()}
            >
              Previous
            </a>
          </li>

          {totalDisplayPages &&
            totalDisplayPages?.slice(0, 8)?.map((newPage, index) => (
              <li
                key={index}
                className={`page-item smallPagi ${
                  page === index + 1 ? "active" : ""
                }   `}
                onClick={() => fetchByPage(index + 1)}
              >
                <a
                  className="page-link"
                  href="true"
                  onClick={(e) => e.preventDefault()}
                >
                  {index + 1}
                  {/* {newPage} */}
                </a>
              </li>
            ))}

          <li
            className={`page-item  ${displableNext ? "disabled" : ""}`}
            onClick={() => next()}
          >
            <a
              className="page-link"
              href="true"
              onClick={(e) => e.preventDefault()}
            >
              Next
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default PaginationBlock;
