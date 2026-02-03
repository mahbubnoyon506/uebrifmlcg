import { Movie } from "../../types/types";

export const useRecentViewed = () => {
  const addToRecent = (movie: Movie) => {
    const saved = JSON.parse(localStorage.getItem("recentlyViewed") || "[]");

    const filtered = saved.filter((m: Movie) => m.id !== movie.id);

    const updated = [movie, ...filtered].slice(0, 10);

    localStorage.setItem("recentlyViewed", JSON.stringify(updated));
  };

  const getRecent = (): Movie[] => {
    return JSON.parse(localStorage.getItem("recentlyViewed") || "[]");
  };

  return { addToRecent, getRecent };
};
