import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { Genre } from "../types/types";
import { useGenrePreview } from "../app/hooks/useMovies";
import MovieCard from "./MovieCard";

export default function GenreSection({ genre }: { genre: Genre }) {
  const { data: movies, isLoading } = useGenrePreview(genre.id);

  if (isLoading)
    return <div className="h-40 animate-pulse bg-muted rounded-lg" />;

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-semibold">{genre.name}</h3>
        <Link
          href={`/genre/${genre.id}`}
          className="text-primary flex items-center hover:underline text-sm"
        >
          View All <ChevronRight className="w-4 h-4" />
        </Link>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {movies?.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
}
