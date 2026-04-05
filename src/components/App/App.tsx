import { useState, useEffect } from "react";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import toast, { Toaster } from "react-hot-toast";

import { fetchMovies } from "../../services/movieService";
import type { Movie } from "../../types/movie";

import SearchBar from "../SearchBar/SearchBar";
import MovieGrid from "../MovieGrid/MovieGrid";
import MovieModal from "../MovieModal/MovieModal"; // Потрібно створити
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import ReactPaginate from "react-paginate"; // Використовуємо бібліотеку напряму
import css from "./App.module.css";

const App = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  const { data, isLoading, isError, isSuccess } = useQuery({
    queryKey: ["movies", searchQuery, page],
    queryFn: () => fetchMovies(searchQuery, page),
    enabled: searchQuery !== "",
    placeholderData: keepPreviousData,
  });

  // Логіка тостів при успішному запиті
  useEffect(() => {
    if (isSuccess && data) {
      if (data.results.length === 0 && searchQuery) {
        toast.error("No movies found for your request.");
      } else if (page === 1 && data.results.length > 0) {
        toast.success(`Found ${data.total_results} movies!`);
      }
    }
  }, [isSuccess, data, searchQuery, page]);

  const handleSearch = (newQuery: string) => {
    if (newQuery === searchQuery) return;
    setSearchQuery(newQuery);
    setPage(1);
  };

  const closeModal = () => setSelectedMovie(null);

  return (
    <div className={css.app}>
      <Toaster position="top-right" />
      <SearchBar onSubmit={handleSearch} />

      {isLoading && <Loader />}
      {isError && <ErrorMessage />}

      {data && data.results.length > 0 && (
        <>
          {/* Пагінація зверху */}
          <ReactPaginate
            pageCount={data.total_pages > 500 ? 500 : data.total_pages}
            onPageChange={({ selected }) => setPage(selected + 1)}
            forcePage={page - 1}
            containerClassName={css.pagination}
            activeClassName={css.active}
            disabledClassName={css.disabled}
            nextLabel="→"
            previousLabel="←"
          />

          <MovieGrid movies={data.results} onSelect={setSelectedMovie} />
        </>
      )}

      {selectedMovie && (
        <MovieModal movie={selectedMovie} onClose={closeModal} />
      )}
    </div>
  );
};

export default App;
