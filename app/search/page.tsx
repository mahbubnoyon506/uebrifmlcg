import SearchMovies from "./components/SearchMovies";

export const metadata = {
  title: "Search Movies",
  description:
    "Search our extensive database to find movies by title. Explore details, ratings, and cast information.",
};

export default function SearchPage() {
  return <SearchMovies />;
}
