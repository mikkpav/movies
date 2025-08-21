import type { Movie } from "../../../types/movies";
import { useNavigate } from 'react-router-dom';

type MovieListItemProps = {
    movie: Movie
};

export default function MovieListItem({ movie }: MovieListItemProps) {
    const navigate = useNavigate();

    function navigateToMovieDetails() {
        navigate(`/movie/${movie.id}`);
    }

    return (
        <div 
            className='flex flex-row m-6 p-2 max-h-40 bg-gray-100 rounded-2xl cursor-pointer' 
            onClick={ navigateToMovieDetails }>
            <img 
                src={movie.posterPathSmall} 
                alt={movie.title} 
                className='object-contain' />
            <div className='flex flex-col justify-end gap-2'>
                <h1 className='font-semibold'>{movie.title}</h1>
                <p className='flex-1 text-sm'>
                    <span className='line-clamp-3'>{movie.overview}</span>
                </p>
                <p className=''>{movie.voteAverage}</p>
            </div>
        </div>
    );
}