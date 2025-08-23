import { API_BASE, tmdbFetchOptions } from '../config/api';
import type { Movie, MoviesResponse, TMDBMovieResponse, MovieDetails, TMDBMovieDetailsResponse } from '../types/movies';

const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/';
const POSTER_SIZE_LIST = 'w154';
const POSTER_SIZE_DETAIL = 'w500';

interface ApiResponse<T> {
  data: T;
  status: number;
}

export async function apiClient<T>(path: string): Promise<ApiResponse<T>> {
  const url = `${API_BASE}${path}`;
  console.log('Fetching URL:', url);

  try {
    const response = await fetch(url, tmdbFetchOptions());

    if (!response.ok) {
      throw new Error(`HTTP ${response.status} - ${response.statusText} for ${url}`);
    }

    const data: T = await response.json();
    return { data, status: response.status };
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
}

function mapMovieApiResponse(data: TMDBMovieResponse): Movie {
    return {
        id: data.id,
        overview: data.overview,
        posterPathSmall: `${IMAGE_BASE_URL}${POSTER_SIZE_LIST}${data.poster_path}`,
        backdropPathSmall: `${IMAGE_BASE_URL}${POSTER_SIZE_LIST}${data.backdrop_path}`,
        posterPathLarge: `${IMAGE_BASE_URL}${POSTER_SIZE_DETAIL}${data.poster_path}`,
        backdropPathLarge: `${IMAGE_BASE_URL}${POSTER_SIZE_DETAIL}${data.backdrop_path}`,
        releaseDate: data.release_date,
        title: data.title,
        voteAverage: Math.round(data.vote_average * 10) / 10,
        voteCount: data.vote_count,
        favorite: false
    }
}

export async function getPopularMovies(): Promise<Movie[]> {
    const { data } = await apiClient<MoviesResponse>('/movie/popular');
    return data.results.map(mapMovieApiResponse);
}

function mapMovieDetailsApiResponse(data: TMDBMovieDetailsResponse): MovieDetails {
  return {
        id: data.id,
        overview: data.overview,
        posterPathSmall: `${IMAGE_BASE_URL}${POSTER_SIZE_LIST}${data.poster_path}`,
        backdropPathSmall: `${IMAGE_BASE_URL}${POSTER_SIZE_LIST}${data.backdrop_path}`,
        posterPathLarge: `${IMAGE_BASE_URL}${POSTER_SIZE_DETAIL}${data.poster_path}`,
        backdropPathLarge: `${IMAGE_BASE_URL}${POSTER_SIZE_DETAIL}${data.backdrop_path}`,
        releaseDate: data.release_date,
        title: data.title,
        voteAverage: Math.round(data.vote_average * 10) / 10,
        voteCount: data.vote_count,
        budget: data.budget,
        genres: data.genres,
        homepage: data.homepage,
        imdbId: data.imdb_id,
        originCountry: data.origin_country,
        tagline: data.tagline,
        favorite: false
    }
}

export async function getMovieDetails(id: number): Promise<MovieDetails> {
    const { data } = await apiClient<TMDBMovieDetailsResponse>(`/movie/${id}`);
    return mapMovieDetailsApiResponse(data);
}