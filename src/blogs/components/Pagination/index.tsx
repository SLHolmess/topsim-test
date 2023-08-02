// import Link from 'next/link';

// import config from '../../../package.json';
import { config } from "../../lib/util";
import { Helmet } from "react-helmet";

// import { GrPrevious as PreviousIcon, GrNext as NextIcon } from 'react-icons/gr';
// import { HiOutlineDotsHorizontal as Dots } from 'react-icons/hi';
import styles from "./Pagination.module.scss";

const MAX_NUM_PAGES = 9;

const { homepage = "" } = config;

const Pagination = (props: any) => {
  let { pagesCount, currentPage, basePath, addCanonical = true } = props;
  pagesCount = Number(pagesCount);
  currentPage = Number(currentPage);
  const path = `bai-viet?page=${currentPage}`;

  const hasPreviousPage = pagesCount > 1 && currentPage > 1;
  const hasNextPage = pagesCount > 1 && currentPage < pagesCount;
  let hasPrevDots = false;
  let hasNextDots = false;

  function getPages() {
    let pages = pagesCount;
    let start = 0;
    // If the number of pages exceeds the max
    if (pagesCount > MAX_NUM_PAGES) {
      // Set number of pages to the max
      pages = MAX_NUM_PAGES;
      const half = Math.ceil(MAX_NUM_PAGES / 2);
      const isHead = currentPage <= half;
      const isTail = currentPage > pagesCount - half;
      hasNextDots = !isTail;
      // If the current page is at the head, the start variable remains 0
      if (!isHead) {
        hasPrevDots = true;
        // If the current page is at the tail, the start variable is set to
        // the last chunk. Otherwise the start variable will place the current
        // page at the middle
        start = isTail ? pagesCount - MAX_NUM_PAGES : currentPage - half;
      }
    }
    return [...new Array(pages)].map((_, i) => i + 1 + start);
  }

  const pages = getPages();
  const url = basePath.includes("?") ? homepage+basePath+"&" : homepage+basePath+"?"
  return (
    <>
      <Helmet>
        {addCanonical && !hasPreviousPage && (
          <link rel="canonical" href={`${homepage}${basePath}`} />
        )}
        {hasPreviousPage && (
          <link rel="prev" href={`${homepage}${path}`} />
        )}
        {hasNextPage && (
          <link rel="next" href={`${homepage}${path}`} />
        )}
      </Helmet>

      <nav
        className={styles.nav}
        role="navigation"
        aria-label="Pagination Navigation"
      >
        {(
            <a 
              style={{visibility: !hasPreviousPage ? "hidden": "visible"}}
             href={`${url}page=${currentPage - 1}`} className={styles.prev} aria-label="Goto Previous Page">
              {/* <PreviousIcon /> Previous */}
              Trước
            </a>
        )}

        <ul className={styles.pages}>
          {hasPrevDots && (
            <li className={styles.dots}>
              {/* <Dots aria-label={`Navigation to pages 1-${pages[0] - 1} hidden`} /> */}
              ...
            </li>
          )}
          {pages.map((page) => {
            const active = page === currentPage;
            return active ? (
              <li key={page}>
                <span
                  className={styles.active}
                  aria-label={`Current Page, Page ${page}`}
                  aria-current="true"
                >
                  {page}
                </span>
              </li>
            ) : (
              <li key={page}>
                <a href={`${url}page=${page}`} aria-label={`Goto Page ${page}`}>
                  <span>{page}</span>
                </a>
              </li>
            );
          })}
          {hasNextDots && (
            <li className={styles.dots}>
              {/* <Dots aria-label={`Navigation to pages ${pages[pages.length - 1] + 1}-${pagesCount} hidden`} /> */}
              ...
            </li>
          )}
        </ul>

        {(
          <a
            style={{visibility: !hasNextPage ? "hidden": "visible"}}
            href={`${url}page=${currentPage + 1}`}
            className={styles.next}
            aria-label="Goto Next Page"
          >
            {/* Next <NextIcon /> */}
            Sau
          </a>
        )}
      </nav>
    </>
  );
};

export default Pagination;
