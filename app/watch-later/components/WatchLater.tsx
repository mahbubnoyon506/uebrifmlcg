"use client";

import MovieCard from "@/components/MovieCard";
import { Movie } from "@/types/types";
import { useEffect, useState } from "react";

export default function WatchLater() {
  const [movies, setMovies] = useState<Movie[]>([]);

  const loadMovies = () => {
    const saved = JSON.parse(localStorage.getItem("watchLater") || "[]");
    setMovies(saved);
  };

  useEffect(() => {
    loadMovies();
    window.addEventListener("watchLaterUpdated", loadMovies);
    return () => window.removeEventListener("watchLaterUpdated", loadMovies);
  }, []);

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-lg md:text-2xl font-bold mb-8">Watch Later</h1>

      {movies.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-muted-foreground">
          <p>Your watch later list is empty.</p>
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
