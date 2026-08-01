import axios from "axios";
import type { Movie } from "../types/movie";

interface MovieResponse {
  results: Movie[];
  total_pages: number;
}

export async function fetchMovies(query: string): Promise<MovieResponse> {
  const response = await axios.get<MovieResponse>(
    "https://api.themoviedb.org/3/search/movie",
    {
      params: {
        query: query,
      },
      headers: {
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxYjZmNjA0OTcwODE3NGEwOWJkMTM5YTM3MmNlOGJhYSIsIm5iZiI6MTc4NTYwMjMwNC41NTUsInN1YiI6IjZhNmUyMTAwYWJkZmI5YWE0YjRkN2E0OSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ._8wfNAqOc8b42_phubrMGC6K9Y8tuZ1puvlXsXWgW6I",
      },
    },
  );
  return response.data;
}
