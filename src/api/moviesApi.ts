import axios, { type AxiosResponse } from 'axios';
import { getUserId } from '../utils/userId';
import type { FavoriteToggleResponse, MovieDetails } from '../types/movies';

const moviesClient = axios.create({
    baseURL: import.meta.env.VITE_MOVIES_API_URL
});

moviesClient.interceptors.request.use(config => {
    const fullUrl = `${config.baseURL}${config.url}`;
    console.log('Movies API request:', config.method?.toUpperCase(), fullUrl, config.params || config.data || {});
    return config;
});

export const toggleFavoriteMovie = async (movieId: number): Promise<AxiosResponse<FavoriteToggleResponse>> => {
    const userId = getUserId();
    return moviesClient.post('/favorites/toggle', { userId: userId, movieId: movieId });
};

export const getFavorites = async () => {
    const userId = getUserId();
    return moviesClient.get('/favorites', { params: { userId: userId }});
};

export const getFavoriteMovies = async (): Promise<AxiosResponse<MovieDetails[]>> => {
    const userId = getUserId();
    return moviesClient.get('/favorites/movies', { params: { userId: userId }});
};