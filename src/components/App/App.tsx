/* src/components/App/App.tsx */
import { useState } from "react";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { fetchMovies } from "../../services/movieService";
import SearchBar from "../SearchBar/SearchBar";
import MovieGrid from "../MovieGrid/MovieGrid";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import Pagination from "../Pagination/Pagination";
import css from "./App.module.css";

const App = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [page, setPage] = useState<number>(1);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["movies", searchQuery, page],
    queryFn: () => fetchMovies(searchQuery, page),
    enabled: searchQuery !== "",
    placeholderData: keepPreviousData,
    retry: false,
  });

  const handleSearch = (newQuery: string) => {
    if (newQuery === searchQuery) return;
    setSearchQuery(newQuery);
    setPage(1);
  };

  const totalPages = data?.total_pages || 0;

  return (
    <div className={css.app}>
      <SearchBar onSubmit={handleSearch} />

      {isLoading && <Loader />}
      {isError && <ErrorMessage />}

      {data && data.results.length > 0 && (
        <>
          {totalPages > 1 && (
            <Pagination
              totalPages={totalPages}
              onPageChange={setPage}
              forcePage={page}
              styles={css}
            />
          )}

          <MovieGrid movies={data.results} />
        </>
      )}
    </div>
  );
};

export default App;
