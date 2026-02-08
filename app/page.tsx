"use client";
import { useHomeData } from "../hooks/useMovies";
import MovieCard from "../components/MovieCard";
import GenreSection from "../components/GenreSection";
import MovieCardSkeleton from "@/components/MovieCardSkeleton";
import Hero from "@/components/Hero";
import HeroSkeleton from "@/components/HeroSkeleton";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useRef } from "react";

export default function HomePage() {
  const { genres, topRated, trending, isLoading, isTrendingLoading } =
    useHomeData();

  const sliderRef = useRef<Slider>(null);

  const handleInputFocus = (isFocused: boolean) => {
    if (isFocused) {
      sliderRef.current?.slickPause();
    } else {
      sliderRef.current?.slickPlay();
    }
  };
  const settings = {
    arrows: false,
    fade: true,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 6000,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    waitForAnimate: true,
    pauseOnHover: false,
    pauseOnFocus: true,
  };

  return (
    <main>
      {/* Hero section */}
      {isTrendingLoading ? (
        <HeroSkeleton />
      ) : trending?.length ? (
        <div className="slider-container">
          <Slider ref={sliderRef} {...settings}>
            {trending.slice(0, 5).map((item) => (
              <Hero
                key={item.id}
                movie={item}
                onFocusChange={handleInputFocus}
              />
            ))}
          </Slider>
        </div>
      ) : null}

      {/* Top rated movies */}
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

      {/* Movies by Genre */}
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
