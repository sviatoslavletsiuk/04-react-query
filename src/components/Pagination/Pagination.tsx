import ReactPaginate, { type ReactPaginateProps } from "react-paginate";

const ReactPaginateFix =
  (
    ReactPaginate as unknown as {
      default?: React.ComponentType<ReactPaginateProps>;
    }
  ).default ||
  (ReactPaginate as unknown as React.ComponentType<ReactPaginateProps>);

interface Props {
  totalPages: number;
  onPageChange: (page: number) => void;
  forcePage: number;
  styles: Record<string, string>;
}

const Pagination = ({ totalPages, onPageChange, forcePage, styles }: Props) => {
  return (
    <ReactPaginateFix
      pageCount={totalPages > 500 ? 500 : totalPages}
      pageRangeDisplayed={3}
      marginPagesDisplayed={1}
      onPageChange={({ selected }) => onPageChange(selected + 1)}
      forcePage={forcePage - 1}
      // Прив'язка ваших стилів
      containerClassName={styles.pagination}
      activeClassName={styles.active}
      disabledClassName={styles.disabled}
      // Стрілки та розділювачі
      nextLabel="→"
      previousLabel="←"
      breakLabel="..."
    />
  );
};

export default Pagination;
