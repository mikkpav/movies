import axios, { type AxiosResponse } from 'axios';
import type { User } from '../types/User';
import type { FavoriteToggleResponse, MovieDetails } from '../types/movies';

const moviesAuthClient = axios.create({
    baseURL: import.meta.env.VITE_MOVIES_API_URL,
    withCredentials: true
});

moviesAuthClient.interceptors.request.use(config => {
    const fullUrl = `${config.baseURL}${config.url}`;
    console.log('Movies auth API request:', config.method?.toUpperCase(), fullUrl, config.params || config.data || {});
    return config;
});

export const signupUser = async (email: string, password: string): Promise<AxiosResponse<User>> => {
    return moviesAuthClient.post('/auth/signup', { email, password });
}

export const loginUser = async (email: string, password: string): Promise<AxiosResponse<User>> => {
    return moviesAuthClient.post('/auth/login', { email, password });
}

export const getUser = async (): Promise<AxiosResponse<User>> => {
    return moviesAuthClient.get('/auth/me');
};

export const logoutUser = async (): Promise<AxiosResponse<User>> => {
    return moviesAuthClient.post('/auth/logout');
}

//
// Favorites
//

export const toggleFavoriteMovie = async (movieId: number): Promise<AxiosResponse<FavoriteToggleResponse>> => {
    return moviesAuthClient.post('/favorites/toggle', { movieId: movieId });
};

export const getFavorites = async () => {
    return moviesAuthClient.get('/favorites/ids');
};

export const getFavoriteMovies = async (): Promise<AxiosResponse<MovieDetails[]>> => {
    return moviesAuthClient.get('/favorites/movies');
};