import axios from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_TMDB_BASE_URL;
const ACCESS_TOKEN = process.env.NEXT_PUBLIC_TMDB_API_KEY;

export const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${ACCESS_TOKEN}`,
  },
});

export const getImageUrl = (path: string, size: string = "w500") =>
  path ? `https://image.tmdb.org/t/p/${size}${path}` : "/placeholder-movie.png";
