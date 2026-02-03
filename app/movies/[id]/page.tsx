"use client";

import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import Image from "next/image";

import { useEffect } from "react";

import { Star, Clock, Calendar } from "lucide-react";
import { useRecentViewed } from "@/app/hooks/useRecentViewed";
import { movieService } from "@/app/services/MovieServices";
import MovieCard from "@/app/components/MovieCard";
import { getImageUrl } from "@/app/lib/api";

export default function MovieDetailsPage() {
  const { id } = useParams();
  const { addToRecent } = useRecentViewed();

  const { data: movie, isLoading } = useQuery({
    queryKey: ["movie", id],
    queryFn: () => movieService.getMovieDetails(id as string),
  });

  const { data: similarMovies } = useQuery({
    queryKey: ["movie", "similar", id],
    queryFn: () => movieService.getSimilarMovies(id as string),
  });

  // Track Recently Viewed
  useEffect(() => {
    if (movie) addToRecent(movie);
  }, [movie, addToRecent]);

  if (isLoading)
    return <div className="p-10 text-center">Loading details...</div>;
  if (!movie) return <div className="p-10 text-center">Movie not found.</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Movie Details Header */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        <div className="relative aspect-2/3 rounded-xl overflow-hidden shadow-2xl">
          <Image
            src={getImageUrl(movie.poster_path, "w780")}
            alt={movie.title}
            fill
            className="object-cover"
          />
        </div>

        <div className="md:col-span-2 space-y-6">
          <h1 className="text-4xl font-extrabold">{movie.title}</h1>
          <p className="text-xl italic text-muted-foreground">
            {movie.tagline}
          </p>

          <div className="flex flex-wrap gap-4 text-sm font-medium">
            <span className="flex items-center gap-1">
              <Star className="w-4 h-4 text-yellow-500 fill-current" />{" "}
              {movie.vote_average.toFixed(1)}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="w-4 h-4" /> {movie.runtime} min
            </span>
            <span className="flex items-center gap-1">
              <Calendar className="w-4 h-4" /> {movie.release_date}
            </span>
          </div>

          <div className="flex gap-2">
            {movie.genres.map((g) => (
              <span
                key={g.id}
                className="px-3 py-1 bg-primary/10 rounded-full text-xs"
              >
                {g.name}
              </span>
            ))}
          </div>

          <div>
            <h3 className="text-xl font-bold mb-2">Overview</h3>
            <p className="text-muted-foreground leading-relaxed">
              {movie.overview}
            </p>
          </div>
        </div>
      </div>

      {/* Similar Movies Section  */}
      <section className="mt-12">
        <h2 className="text-2xl font-bold mb-6">Similar Movies</h2>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
          {similarMovies?.results.slice(0, 5).map((m) => (
            <MovieCard key={m.id} movie={m} />
          ))}
        </div>
      </section>
    </div>
  );
}
