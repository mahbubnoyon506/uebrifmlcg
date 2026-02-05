"use client";

import Image from "next/image";
import Link from "next/link";
import { Star, Bookmark, BookmarkCheck } from "lucide-react";
import { useState, useEffect } from "react";
import { Movie } from "../types/types";
import { getImageUrl } from "../lib/api";

interface MovieCardProps {
  movie: Movie;
}

export default function MovieCard({ movie }: MovieCardProps) {
  const [isWatchLater, setIsWatchLater] = useState(false);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("watchLater") || "[]");
    setIsWatchLater(saved.some((m: Movie) => m.id === movie.id));
  }, [movie.id]);

  const toggleWatchLater = (e: React.MouseEvent) => {
    e.preventDefault();
    const saved = JSON.parse(localStorage.getItem("watchLater") || "[]");

    let updated;
    if (isWatchLater) {
      updated = saved.filter((m: Movie) => m.id !== movie.id);
    } else {
      updated = [...saved, movie];
    }

    localStorage.setItem("watchLater", JSON.stringify(updated));
    setIsWatchLater(!isWatchLater);
    window.dispatchEvent(new Event("watchLaterUpdated"));
  };

  return (
    <div className="group relative bg-card rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 border border-border">
      <Link href={`/movies/${movie.id}`}>
        <div className="relative aspect-2/3 w-full">
          <Image
            src={
              movie.poster_path
                ? getImageUrl(movie.poster_path)
                : "/assets/images/poster-cover-placeholder.jpg"
            }
            alt={movie.title}
            fill
            placeholder="blur"
            blurDataURL={
              movie.poster_path
                ? getImageUrl(movie.poster_path)
                : "/assets/images/poster-cover-placeholder.jpg"
            }
            sizes="(max-width: 768px) 50vw, (max-width: 1200px) 20vw, 15vw"
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />

          <div className="absolute top-2 left-2 bg-black/60 backdrop-blur-md text-white text-xs font-bold px-2 py-1 rounded flex items-center gap-1">
            <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
            {movie.vote_average.toFixed(1)}
          </div>

          <button
            onClick={toggleWatchLater}
            className="absolute top-2 right-2 p-2 cursor-pointer rounded-full bg-black/60 backdrop-blur-md text-white hover:bg-primary transition-colors z-10"
            title={
              isWatchLater ? "Remove from Watch Later" : "Add to Watch Later"
            }
          >
            {isWatchLater ? (
              <BookmarkCheck className="w-5 h-5 fill-current text-primary-foreground" />
            ) : (
              <Bookmark className="w-5 h-5" />
            )}
          </button>
        </div>

        <div className="p-3">
          <h3 className="font-semibold text-sm line-clamp-1 group-hover:text-primary transition-colors">
            {movie.title}
          </h3>
          <p className="text-xs text-muted-foreground mt-1">
            {new Date(movie.release_date).getFullYear() || "N/A"}
          </p>
        </div>
      </Link>
    </div>
  );
}
