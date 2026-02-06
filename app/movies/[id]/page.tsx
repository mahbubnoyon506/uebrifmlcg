import { movieService } from "@/services/movieServices";

import { getImageUrl } from "@/lib/api";
import MovieDetailClient from "./components/MovieDetailClient";
import { Metadata } from "next";

type Props = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  try {
    const movie = await movieService.getMovieDetails(id);
    return {
      title: movie.title,
      description: movie.overview.slice(0, 160),
      openGraph: {
        images: [getImageUrl(movie.backdrop_path)],
      },
    };
  } catch (error) {
    return { title: "Movie Not Found" };
  }
}

export default async function MovieDetailsPage({ params }: Props) {
  const { id } = await params;

  return <MovieDetailClient id={id} />;
}
