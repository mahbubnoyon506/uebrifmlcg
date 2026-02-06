import { Suspense } from "react";
import SearchMovies from "./components/SearchMovies";
import MovieCardSkeleton from "@/components/MovieCardSkeleton";

export const metadata = {
  title: "Search Movies",
  description:
    "Search our extensive database to find movies by title. Explore details, ratings, and cast information.",
};

export default function SearchPage() {
  return (
    <Suspense
      fallback={
        <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
          <MovieCardSkeleton count={10} />
        </div>
      }
    >
      <SearchMovies />
    </Suspense>
  );
}
