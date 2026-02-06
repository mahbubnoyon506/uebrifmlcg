import { api } from "../lib/api";
import {
  Genre,
  Movie,
  MovieCredits,
  MovieDetails,
  TMDBResponse,
} from "../types/types";

export const movieService = {
  getTopRated: async (page = 1) => {
    const { data } = await api.get<TMDBResponse<Movie>>(`/movie/top_rated`, {
      params: { page },
    });
    return data;
  },

  getGenres: async () => {
    const { data } = await api.get<{ genres: Genre[] }>("/genre/movie/list");
    return data.genres;
  },

  getMoviesByGenre: async (
    genreId: string,
    page = 1,
    sortBy = "popularity.desc",
  ) => {
    const { data } = await api.get<TMDBResponse<Movie>>("/discover/movie", {
      params: {
        with_genres: genreId,
        page,
        sort_by: sortBy,
      },
    });
    return data;
  },

  getMovieDetails: async (id: string): Promise<MovieDetails> => {
    const { data } = await api.get<MovieDetails>(`/movie/${id}`);
    return data;
  },

  searchMovies: async (query: string, page = 1) => {
    if (!query)
      return { results: [], page: 1, total_pages: 0, total_results: 0 };
    const { data } = await api.get<TMDBResponse<Movie>>("/search/movie", {
      params: { query, page },
    });
    return data;
  },

  getSimilarMovies: async (movieId: string, page = 1) => {
    const { data } = await api.get<TMDBResponse<Movie>>(
      `/movie/${movieId}/similar`,
      {
        params: { page },
      },
    );
    return data;
  },

  getMovieCredits: async (movieId: string) => {
    const { data } = await api.get<MovieCredits>(`/movie/${movieId}/credits`);
    return data;
  },

  getTrendingMovies: async (
    timeWindow: "day",
  ): Promise<TMDBResponse<Movie>> => {
    const { data } = await api.get<TMDBResponse<Movie>>(
      `/trending/movie/${timeWindow}`,
    );
    return data;
  },
};
