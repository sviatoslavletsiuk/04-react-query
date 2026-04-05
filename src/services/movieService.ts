import axios from "axios";
import type { Movie } from "../types/movie";

export interface MoviesResponse {
  results: Movie[];
  total_pages: number;
  total_results: number;
  page: number;
}

const ACCESS_TOKEN = import.meta.env.VITE_ACCESS_TOKEN;

const movieInstance = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  headers: {
    Authorization: `Bearer ${ACCESS_TOKEN}`,
    Accept: "application/json",
  },
});

export const fetchMovies = async (
  query: string,
  page: number,
): Promise<MoviesResponse> => {
  const { data } = await movieInstance.get<MoviesResponse>("/search/movie", {
    params: {
      query,
      page,
      language: "en-US",
      include_adult: false,
    },
  });
  return data;
};
