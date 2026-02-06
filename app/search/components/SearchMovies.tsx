"use client";

import { useState } from "react";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useDebounce } from "@/hooks/useDebounce";
import MovieCard from "@/components/MovieCard";
import { Input } from "@/components/ui/input";
import { Search as SearchIcon, Loader2 } from "lucide-react";
import { movieService } from "@/services/movieServices";
import MovieCardSkeleton from "@/components/MovieCardSkeleton";
import { useSearchParams } from "next/navigation";

export default function SearchMovies() {
  const searchParams = useSearchParams();
  const param = searchParams.get("search") || "";

  const [searchTerm, setSearchTerm] = useState(param || "");
  const debouncedSearch = useDebounce(searchTerm, 500);

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ["search", debouncedSearch],
    queryFn: () => movieService.searchMovies(debouncedSearch),
    enabled: debouncedSearch.length > 0,
    placeholderData: keepPreviousData,
  });

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto mb-12">
        <h1 className="text-lg md:text-2xl font-bold mb-6 text-center">
          Search Movies
        </h1>
        <div className="relative">
          <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-5 h-5" />
          <Input
            type="text"
            placeholder="Search by movie title..."
            className="pl-10 h-12 text-lg"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            autoFocus
          />
          {isFetching && (
            <Loader2 className="absolute right-3 top-1/2 -translate-y-1/2 animate-spin text-primary w-5 h-5" />
          )}
        </div>
      </div>

      {data?.results && data.results.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {isLoading && debouncedSearch ? (
            <MovieCardSkeleton count={5} />
          ) : (
            data.results.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))
          )}
        </div>
      ) : (
        debouncedSearch &&
        !isFetching && (
          <div className="text-center py-20 text-muted-foreground">
            No results found for &quot;{debouncedSearch}&quot;.
          </div>
        )
      )}
    </main>
  );
}
