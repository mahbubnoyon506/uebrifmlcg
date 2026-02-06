"use client";

import { useEffect, useState } from "react";
import { Movie } from "@/types/types";
import MovieCard from "@/components/MovieCard";

export default function RecentlyViewed() {
  const [movies, setMovies] = useState<Movie[]>([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("recentlyViewed") || "[]");
    setMovies(saved);
  }, []);

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-lg md:text-2xl font-bold mb-8">Recently Viewed</h1>
      {movies.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-muted-foreground">
          <p>No recently viewed movies yet.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      )}
    </main>
  );
}
