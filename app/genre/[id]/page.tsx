import { movieService } from "@/services/movieServices";
import MoviesByGenre from "./components/MoviesByGenre";
import { Metadata } from "next";

type Props = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const genresResponse = await movieService.getGenres();
  const currentGenre = genresResponse.find((item) => item.id.toString() === id);
  const genreName = currentGenre?.name || "Movie";

  return {
    title: `${genreName} Movies`,
    description: `Explore the best ${genreName.toLowerCase()} movies. Sort by popularity, release date, and rating to find your next favorite film.`,
    openGraph: {
      title: `Top ${genreName} Movies | MovieDiscovery`,
      description: `Browse a curated list of ${genreName.toLowerCase()} films in our database.`,
      type: "video.movie",
    },
  };
}

export default async function MovieDetailsPage({ params }: Props) {
  const { id } = await params;

  return <MoviesByGenre id={id} />;
}
