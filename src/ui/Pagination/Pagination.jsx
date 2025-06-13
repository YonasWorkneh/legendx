/* eslint-disable react/prop-types */
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { useAppContext } from "../../contexts/AppContext";
import styles from "./Pagination.module.css";

function Pagination({ total, currentPage, onSetCurrentPage }) {
  const { recordPerPage } = useAppContext();

  const index = recordPerPage * currentPage;
  const lastIndex = index > total ? total : index;
  const rem = index - lastIndex + 1;
  const firstIndex = lastIndex - recordPerPage;
  const nPage = Math.ceil(total / recordPerPage);
  const nBtnDisplayed = 2;
  const nBtnsToDisplay = 3;
  function updatePageNum(pageNum) {
    if (pageNum < 1 || pageNum > nPage) return;
    onSetCurrentPage(pageNum);
  }

  return (
    <div className={styles.pagination}>
      <span className={styles.desc}>
        Showing data {firstIndex + rem} to {lastIndex} of {total} entries
      </span>
      <div className={styles.btns}>
        <button
          onClick={() => updatePageNum(currentPage - 1)}
          className={`center ${styles.btn}`}
        >
          <IoIosArrowBack />
        </button>
        <button
          className={`center ${currentPage === 1 ? styles.active : ""} ${
            styles.btn
          }`}
          onClick={() => updatePageNum(1)}
        >
          1
        </button>
        <>
          {nPage <= 6 ? (
            Array.from({ length: nPage - nBtnDisplayed }).map((_, i) => (
              <button
                key={i + 2}
                className={`center ${styles.btn} ${
                  currentPage === i + 2 ? styles.active : ""
                }`}
                onClick={() => updatePageNum(i + 2)}
              >
                {i + 2}
              </button>
            ))
          ) : (
            <>
              {currentPage > 4 && <span>...</span>}
              {currentPage < 5
                ? Array.from({ length: 3 }).map((_, i) => (
                    <button
                      key={i + 2}
                      className={`center ${styles.btn} ${
                        currentPage === i + 2 ? styles.active : ""
                      }`}
                      onClick={() => updatePageNum(i + 2)}
                    >
                      {i + 2}
                    </button>
                  ))
                : Array.from({ length: nBtnsToDisplay }).map(
                    (_, i) =>
                      i + currentPage - 1 < nPage && (
                        <button
                          key={i + currentPage - 1}
                          className={`center ${styles.btn} ${
                            currentPage === i + currentPage - 1
                              ? styles.active
                              : ""
                          }`}
                          onClick={() => updatePageNum(i + currentPage - 1)}
                        >
                          {i + currentPage - 1}
                        </button>
                      )
                  )}

              {currentPage < nPage - 2 && <span>...</span>}
            </>
          )}
        </>
        <button
          className={`center ${styles.btn} ${
            currentPage === nPage ? styles.active : ""
          }`}
          onClick={() => updatePageNum(nPage)}
        >
          {nPage}
        </button>
        <button
          onClick={() => updatePageNum(currentPage + 1)}
          className={`center ${styles.btn}`}
        >
          <IoIosArrowForward />
        </button>
      </div>
    </div>
  );
}

export default Pagination;
