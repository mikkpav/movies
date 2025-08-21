import type { MovieDetails } from '../../../types/movies'
import { formatCurrency, formatDate } from '../../../utils/formats'
import StarIcon from '../../../assets/star.png'

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
                <section className='flex items-center gap-1'>
                    <img src={StarIcon} className='h-6'/>
                    <p className='font-bold'>{details.voteAverage}</p>
                </section>
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