"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Search, PlayCircle } from "lucide-react";
import { getImageUrl } from "@/lib/api";
import { Movie } from "@/types/types";

interface HeroProps {
  movie: Movie;
  onFocusChange: (isFocused: boolean) => void;
}

export default function Hero({ movie, onFocusChange }: HeroProps) {
  const [query, setQuery] = useState("");
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/search?search=${encodeURIComponent(query)}`);
    }
  };

  return (
    <div className="relative w-full min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Image
          src={
            movie?.backdrop_path
              ? getImageUrl(movie.backdrop_path, "original")
              : "/assets/images/poster-placeholder-landscape.jpg"
          }
          alt={movie.title}
          fill
          className="object-cover brightness-50 top-top transition-transform duration-1000 hover:scale-105"
          priority
        />
        <div className="absolute inset-0 bg-linear-to-t from-background via-background/20 to-transparent" />
      </div>

      {/* Content */}
      <div className="container relative z-10 px-4 text-center space-y-8">
        <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-1000">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-white tracking-tight drop-shadow-2xl">
            Welcome to <span className="text-primary">MovieDiscovery</span>
          </h1>
          <p className="text-lg md:text-2xl text-slate-200 max-w-2xl mx-auto font-medium drop-shadow-md">
            Millions of movies, TV shows and people to discover. Explore now.
          </p>
        </div>

        {/* Search Bar */}
        <form
          onSubmit={handleSearch}
          className="relative max-w-3xl mx-auto flex items-center group"
        >
          <div className="relative w-full">
            <input
              type="text"
              placeholder="Search for a movie, person or genre..."
              onFocus={() => onFocusChange(true)}
              onBlur={() => onFocusChange(false)}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full h-14 md:h-16 pl-6 pr-32 rounded-full bg-white/95 dark:bg-slate-900/90 backdrop-blur-md text-foreground border-none shadow-2xl focus:ring-2 focus:ring-primary transition-all text-lg"
            />
            <button
              type="submit"
              className="absolute cursor-pointer right-2 top-2 bottom-2 px-8 bg-linear-to-r from-primary to-blue-600 text-white rounded-full font-bold hover:opacity-90 transition-all flex items-center gap-2"
            >
              <Search className="w-5 h-5" />
              <span className="hidden md:inline">Search</span>
            </button>
          </div>
        </form>

        <div className="flex items-center justify-center gap-2 text-white/80 font-medium text-sm md:text-base animate-pulse">
          <PlayCircle className="w-5 h-5 text-primary" />
          <span className="text-primary">Trending now: {movie.title}</span>
        </div>
      </div>
    </div>
  );
}
