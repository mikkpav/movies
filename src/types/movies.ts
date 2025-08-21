export interface TMDBMovieResponse {
    id: number;
    title: string;
    overview: string;
    release_date: string;
    poster_path: string;
    backdrop_path: string;
    vote_average: number;
    vote_count: number;
}

export interface MoviesResponse {
    page: number;
    results: TMDBMovieResponse[];
}

export interface Movie {
    id: number;
    overview: string;
    posterPathSmall: string;
    backdropPathSmall: string;
    posterPathLarge: string;
    backdropPathLarge: string;
    releaseDate: string;
    title: string;
    voteAverage: number;
    voteCount: number;
}