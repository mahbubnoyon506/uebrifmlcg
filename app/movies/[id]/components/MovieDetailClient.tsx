"use client";

import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { getImageUrl } from "@/lib/api";
import { Clock, Play, Bookmark, Heart } from "lucide-react";
import MovieCard from "@/components/MovieCard";
import { movieService } from "@/services/movieServices";
import { useEffect } from "react";
import { useRecentViewed } from "@/hooks/useRecentViewed";
import MovieCardSkeleton from "@/components/MovieCardSkeleton";
import { UserScore } from "@/components/UserScore";
import {
  CastSkeleton,
  MovieDetailsSkeleton,
} from "@/components/MovieDetailsSkeleton";

export default function MovieDetailClient({ id }: { id: string }) {
  const { addToRecent } = useRecentViewed();

  const { data: movie, isLoading: movieLoading } = useQuery({
    queryKey: ["movie", id],
    queryFn: () => movieService.getMovieDetails(id as string),
  });

  const { data: credits, isLoading: creditsLoading } = useQuery({
    queryKey: ["movie", "credits", id],
    queryFn: () => movieService.getMovieCredits(id as string),
  });

  const { data: similarMovies, isLoading: isLoadingSimilar } = useQuery({
    queryKey: ["movie", "similar", id],
    queryFn: () => movieService.getSimilarMovies(id as string),
  });

  // Track Recently Viewed
  useEffect(() => {
    if (movie) addToRecent(movie);
  }, [movie, addToRecent]);

  return (
    <div>
      <div className="min-h-screen bg-background">
        {/* Hero Section with Backdrop Overlay */}
        {movieLoading ? (
          <MovieDetailsSkeleton />
        ) : movie ? (
          <div className="relative w-full h-150 md:h-125 flex items-center overflow-hidden">
            <Image
              src={getImageUrl(movie.backdrop_path, "original")}
              alt="backdrop"
              fill
              placeholder="blur"
              blurDataURL={getImageUrl(movie.backdrop_path, "original")}
              className="object-cover object-top opacity-40"
              priority
            />
            <div className="absolute inset-0 bg-linear-to-r from-background via-background/80 to-transparent" />

            <div className="container mx-auto px-4 relative z-10 flex flex-col md:flex-row gap-8">
              {/* Poster Container */}
              <div className="hidden md:block w-72 shrink-0 relative aspect-2/3 rounded-lg overflow-hidden shadow-2xl border border-white/10">
                <Image
                  src={getImageUrl(movie.poster_path, "w780")}
                  placeholder="blur"
                  blurDataURL={getImageUrl(movie.poster_path, "w780")}
                  alt={movie.title}
                  fill
                  className="object-cover"
                />
              </div>

              {/* Details Content */}
              <div className="flex flex-col justify-center space-y-4 max-w-4xl">
                <h1 className="text-4xl md:text-5xl font-bold">
                  {movie.title}{" "}
                  <span className="font-light text-muted-foreground">
                    ({new Date(movie.release_date).getFullYear()})
                  </span>
                </h1>

                <div className="flex flex-wrap items-center gap-3 text-sm font-medium">
                  <span className="border px-1 text-[10px] rounded text-muted-foreground uppercase">
                    PG-13
                  </span>
                  <span>{movie.release_date} (US)</span>
                  <span>•</span>
                  <span>{movie.genres.map((g) => g.name).join(", ")}</span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-4 h-4" /> {movie.runtime}m
                  </span>
                </div>

                {/* Action Bar (Mirroring reference image) */}
                <div className="flex items-center flex-wrap gap-6 py-4">
                  <UserScore score={movie.vote_average} />
                  <div className="flex gap-4">
                    <button className="p-3 bg-[#032541] rounded-full hover:scale-110 transition-transform">
                      <Heart className="w-4 h-4 text-white" />
                    </button>
                    <button className="p-3 bg-[#032541] rounded-full hover:scale-110 transition-transform">
                      <Bookmark className="w-4 h-4 text-white" />
                    </button>
                  </div>
                  <button className="flex items-center gap-2 font-bold hover:text-slate-700 transition-colors">
                    <Play className="fill-current" /> Play Trailer
                  </button>
                </div>

                <p className="italic text-lg text-muted-foreground">
                  {movie.tagline}
                </p>

                <div className="space-y-2">
                  <h3 className="text-xl font-bold">Overview</h3>
                  <p className="line-clamp-5 text-muted-foreground text-sm md:text-base leading-relaxed max-w-2xl">
                    {movie.overview}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ) : null}
        {/* Main Content Area: Cast and Similar Movies */}
        {creditsLoading ? (
          <CastSkeleton />
        ) : (
          <div className="container mx-auto px-4 py-12 space-y-12">
            <section>
              <h2 className="text-2xl font-bold mb-6">Top Billed Cast</h2>
              <div className="flex overflow-x-auto gap-4 pb-4 scrollbar-hide">
                {credits?.cast.slice(0, 15).map((person) => (
                  <div
                    key={person.id}
                    className="min-w-35 bg-card rounded-lg border border-border overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                  >
                    <div className="relative aspect-square w-full">
                      <Image
                        src={
                          person.profile_path
                            ? getImageUrl(person.profile_path, "w185")
                            : "/assets/images/placeholder-avatar.jpg"
                        }
                        alt={person.name}
                        fill
                        placeholder="blur"
                        blurDataURL={
                          person.profile_path
                            ? getImageUrl(person.profile_path, "w185")
                            : "/assets/images/placeholder-avatar.jpg"
                        }
                        className="object-cover"
                      />
                    </div>
                    <div className="p-3">
                      <p className="text-sm font-bold line-clamp-1">
                        {person.name}
                      </p>
                      <p className="text-xs text-muted-foreground line-clamp-1">
                        {person.character}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        )}
      </div>
      {/* Similar jobs section */}
      <section className="container mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold mb-6">Similar Movies</h2>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
          {isLoadingSimilar ? (
            <MovieCardSkeleton count={5} />
          ) : (
            similarMovies?.results
              .slice(0, 5)
              .map((m) => <MovieCard key={m.id} movie={m} />)
          )}
        </div>
      </section>
    </div>
  );
}
