import type { MovieDetails } from '../../../types/movies'
import { formatCurrency, formatDate } from '../../../utils/formats'
import StarIcon from '../../../assets/star.png'
import BackButton from '../../../assets/back.png'
import { useNavigate } from 'react-router-dom';
import { useFavorites } from '../../favorites/hooks/useFavorites';
import FavoriteToggle from '../../../components/FavoriteToggle';

type MovieDetailsProps = {
    details: MovieDetails
};

export default function MovieDetails({ details }: MovieDetailsProps) {
    const navigate = useNavigate();
    const { favorites, toggleFavorite } = useFavorites();

    function handleBackAction() {
        navigate(-1);
    }

    return (
        <div className='flex flex-col gap-6'>
            <button className='flex-1 w-6 cursor-pointer' onClick={handleBackAction}>
                <img src={BackButton} className='bg-white'/>
            </button>
            <div className='flex max-h-100 gap-6'>
                <img 
                    src={details.posterPathLarge} 
                    alt={details.title}
                    className='max-h-full object-contain rounded-2xl' />
                <div className='flex flex-1 flex-col gap-4'>
                    <section className='flex justify-between'>
                        <h1 className='text-2xl font-semibold'>{details.title}</h1>
                        <FavoriteToggle 
                            movieId={details.id} 
                            favorites={favorites} 
                            toggleFavorite={toggleFavorite} />
                    </section>
                    <p className='text-lg'>{details.tagline}</p>
                    <p>{details.overview}</p>
                    <section className='flex items-center gap-1'>
                        <img src={StarIcon} className='h-6'/>
                        <p className='font-bold'>{details.voteAverage}</p>
                    </section>
                    <ul className='flex flex-row gap-4'> { 
                            details.genres.map ( genre => (
                                <li 
                                    key={details.id}
                                    className='text-s font-bold'>
                                        {genre.name}
                                </li>
                            ))}
                        </ul>
                    <section className='flex flex-col gap-1'>
                        <p>{formatDate(details.releaseDate)}</p>
                        <p>Budget: {formatCurrency(details.budget)}</p>
                        <a 
                            href={details.homepage}
                            target='_blank' 
                            rel='noopener noreferrer'
                            className='hover:underline'>
                                {details.homepage}
                        </a>
                        <a 
                            href={`https://www.imdb.com/title/${details.imdbId}`} 
                            target='_blank' 
                            rel='noopener noreferrer'
                            className='hover:underline'>
                                IMDB: {details.title}
                        </a>
                        <p>{details.originCountry}</p>
                    </section>
                </div>
            </div>
        </div>
    );
}