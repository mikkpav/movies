import axios, { type AxiosResponse } from 'axios';
import type { Movie, MovieDetails, SearchResponse } from '../types/movies';

const moviesClient = axios.create({
    baseURL: import.meta.env.VITE_MOVIES_API_URL
});

moviesClient.interceptors.request.use(config => {
    const fullUrl = `${config.baseURL}${config.url}`;
    console.log('Movies API request:', config.method?.toUpperCase(), fullUrl, config.params || config.data || {});
    return config;
});

export const getPopularMovies = async (): Promise<AxiosResponse<Movie[]>> => {
    return moviesClient.get('/movies/popular');
};

export const getMovieDetails = async (movieId: number): Promise<AxiosResponse<MovieDetails>> => {
    return moviesClient.get(`/movies/details/${movieId}`);
};

export const searchForMovies = async (query: string): Promise<AxiosResponse<SearchResponse>> => {
    return moviesClient.get('/movies/search', {
        params: { query }
    });
}