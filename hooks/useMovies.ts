"use client";
import { useQuery } from "@tanstack/react-query";
import { movieService } from "../services/movieServices";

export const useHomeData = () => {
  const genresQuery = useQuery({
    queryKey: ["genres"],
    queryFn: movieService.getGenres,
  });

  const topRatedQuery = useQuery({
    queryKey: ["movies", "top-rated"],
    queryFn: () => movieService.getTopRated(1),
  });
  const trendingQuery = useQuery({
    queryKey: ["tranding"],
    queryFn: () => movieService.getTrendingMovies("day"),
  });

  return {
    genres: genresQuery.data,
    topRated: topRatedQuery.data?.results,
    trending: trendingQuery.data?.results,
    isLoading: genresQuery.isLoading || topRatedQuery.isLoading,
    isTrendingLoading: trendingQuery.isLoading,
    isError: genresQuery.isError || topRatedQuery.isError,
  };
};

export const useGenrePreview = (genreId: string) => {
  return useQuery({
    queryKey: ["movies", "genre-preview", genreId],
    queryFn: async () => {
      const data = await movieService.getMoviesByGenre(
        genreId,
        1,
        "popularity.desc",
      );
      return data.results.slice(0, 5);
    },
    enabled: !!genreId,
  });
};
