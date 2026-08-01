import SearchBar from "../SearchBar/SearchBar";
import "./App.module.css";
import { useState } from "react";
import MovieGrid from "../MovieGrid/MovieGrid";
import type { Movie } from "../../types/movie";
import { fetchMovies } from "../../services/movieService";
import toast from "react-hot-toast";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import MovieModal from "../MovieModal/MovieModal";

export default function App() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const handleSearch = async (query: string) => {
    try {
      setIsLoading(true);
      setIsError(false);
      setMovies([]);
      const data = await fetchMovies(query);
      if (data.results.length === 0) {
        toast.error("No movies found for your request.");
        return;
      }
      setMovies(data.results);
    } catch (error) {
      toast.error("Something went wrong. Please try again later.");
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelectMovie = (movie: Movie) => {
    setSelectedMovie(movie);
  };
  return (
    <>
      <SearchBar onSubmit={handleSearch} />
      {selectedMovie && (
        <MovieModal
          movie={selectedMovie}
          onClose={() => setSelectedMovie(null)}
        />
      )}
      {isError && <ErrorMessage />}
      {isLoading && <Loader />}
      {!isLoading && !isError && movies.length > 0 && (
        <MovieGrid movies={movies} onSelect={handleSelectMovie} />
      )}
    </>
  );
}
