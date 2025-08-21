import type { MovieDetails } from '../../../types/movies'
import { formatCurrency, formatDate } from '../../../utils/formats';

type MovieDetailsProps = {
    details: MovieDetails
};

export default function MovieDetails({ details }: MovieDetailsProps) {

    return (
        <div className='flex max-h-100 gap-6'>
            <img 
                src={details.posterPathLarge} 
                alt={details.title}
                className='max-h-full object-contain rounded-2xl' />
            <div className='flex flex-1 flex-col gap-4'>
                <h1 className='text-2xl font-semibold'>{details.title}</h1>
                <p className='text-lg'>{details.tagline}</p>
                <p>{details.overview}</p>
                <p className='font-bold'>{details.voteAverage}</p>
                <p>{formatDate(details.releaseDate)}</p>
                <p>Budget: {formatCurrency(details.budget)}</p>
                <a href={details.homepage}>{details.homepage}</a>
                <p>{details.imdbId}</p>
                <p>{details.originCountry}</p>
                <ul className='flex flex-row gap-4'> { 
                    details.genres.map ( genre => (
                        <li 
                            key={details.id}
                            className='text-s font-bold'>
                                {genre.name}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}