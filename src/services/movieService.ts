import axios from "axios";
import type { Movie } from "../types/movie";

const API_TOKEN = import.meta.env.VITE_TMDB_TOKEN;

const api = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  headers: {
    Authorization: `Bearer ${API_TOKEN}`,
    Accept: "application/json",
  },
});

interface SearchResponse {
  results: Movie[];
}

export const fetchMovies = async (query: string): Promise<Movie[]> => {
  const { data } = await api.get<SearchResponse>("/search/movie", {
    params: {
      query,
      language: "en-US",
      page: 1,
    },
  });
  return data.results;
};
