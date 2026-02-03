"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { movieService } from "@/services/movieServices";
import MovieCard from "@/components/MovieCard";
import { Movie } from "@/types/types";

const SORT_OPTIONS = [
  { label: "Popularity", value: "popularity.desc" },
  { label: "Release Date", value: "primary_release_date.desc" },
  { label: "Rating", value: "vote_average.desc" },
  { label: "Title", value: "original_title.asc" },
];

export default function GenrePage() {
  const { id } = useParams();
  const [sortBy, setSortBy] = useState("popularity.desc");

  const { data, isLoading, isError } = useQuery({
    queryKey: ["movies", "genre", id, sortBy],
    queryFn: () => movieService.getMoviesByGenre(id as string, 1, sortBy),
    placeholderData: keepPreviousData,
  });

  if (isError)
    return <div className="p-10 text-center">Failed to load movies.</div>;

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <h1 className="text-3xl font-bold">Genre Browse</h1>

        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-muted-foreground">
            Sort by:
          </span>
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-45">
              <SelectValue placeholder="Sort movies" />
            </SelectTrigger>
            <SelectContent>
              {SORT_OPTIONS.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Requirement 2c & 47: Display all movies in a responsive grid [cite: 35, 47] */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {data?.results.map((movie: Movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>

      {data?.results.length === 0 && (
        <div className="text-center py-20">No movies found for this genre.</div>
      )}
    </main>
  );
}
