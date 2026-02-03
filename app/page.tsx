"use client";
import { useHomeData } from "./hooks/useMovies";

export default function HomePage() {
  const { genres, topRated, isLoading, isError } = useHomeData();
  console.log(genres);

  return <></>;
}
