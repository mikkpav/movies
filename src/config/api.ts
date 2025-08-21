export const API_BASE = "https://api.themoviedb.org/3";
export const API_ACCESS_TOKEN = import.meta.env.VITE_TMDB_ACCESS_TOKEN;

export function tmdbFetchOptions(): RequestInit {
  return {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${API_ACCESS_TOKEN}`,
    },
  };
}