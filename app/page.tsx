"use client";
import { useHomeData } from "../hooks/useMovies";
import MovieCard from "../components/MovieCard";
import GenreSection from "../components/GenreSection";
import MovieCardSkeleton from "@/components/MovieCardSkeleton";
import Hero from "@/components/Hero";
import HeroSkeleton from "@/components/HeroSkeleton";

export default function HomePage() {
  const { genres, topRated, trending, isLoading, isTrendingLoading } =
    useHomeData();
  const heroMovie = trending ? trending[0] : null;

  return (
    <main>
      {isTrendingLoading ? (
        <HeroSkeleton />
      ) : heroMovie ? (
        <Hero movie={heroMovie} />
      ) : null}
      <section className="container mx-auto px-4 py-8">
        <h2 className="text-lg md:text-2xl font-bold mb-6">Top Rated Movies</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {isLoading ? (
            <MovieCardSkeleton count={10} />
          ) : (
            topRated?.map((movie) => <MovieCard key={movie.id} movie={movie} />)
          )}
        </div>
      </section>

      <section className="container mx-auto px-4 py-8 space-y-8">
        <h2 className="text-lg md:text-2xl font-bold">Movies by Genre</h2>
        {genres?.length
          ? genres?.map((genre) => (
              <GenreSection key={genre.id} genre={genre} />
            ))
          : null}
      </section>
    </main>
  );
}
