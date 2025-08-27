const Pagination = ({ res }: any) => {
  return (
    <ul className="tw:space-y-6 tw:mb-6">
      <div className="tw:flex tw:justify-center tw:gap-2">
        <a
          className={`tw:px-3 tw:py-1 tw:border tw:rounded ${
            !res.prev_page_url ? "tw:opacity-50 tw:pointer-events-none" : ""
          }`}
          href={`?page=${res.current_page - 1}`}
        >
          Previous
        </a>
        <span className="tw:px-3 tw:py-1">
          Page {res.current_page} of {res.last_page}
        </span>
        <a
          className={`tw:px-3 tw:py-1 tw:border tw:rounded ${
            !res.next_page_url ? "tw:opacity-50 tw:pointer-events-none" : ""
          }`}
          href={`?page=${res.current_page + 1}`}
        >
          Next
        </a>
      </div>
    </ul>
  );
};
export default Pagination;
