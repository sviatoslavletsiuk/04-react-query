import axios from "axios";
import type { Movie } from "../types/movie";

export interface MoviesResponse {
  results: Movie[];
  total_pages: number;
  total_results: number;
  page: number;
}

const API_KEY = import.meta.env.VITE_API_KEY; // Переконайтеся, що ключ у Vercel додано

const movieInstance = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  params: {
    api_key: API_KEY,
    language: "en-US",
  },
});

export const fetchMovies = async (
  query: string,
  page: number,
): Promise<MoviesResponse> => {
  const { data } = await movieInstance.get<MoviesResponse>("/search/movie", {
    params: { query, page },
  });
  return data;
};
