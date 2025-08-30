import type { Movie } from '../../../types/movies';
import MovieListItem from './MovieListItem';
import { motion, AnimatePresence} from 'framer-motion';

type MovieListProps = {
    movies: Movie[]
};

export default function MovieList({ movies }: MovieListProps) {
    return (
        <ul className='flex flex-col gap-4'>
            <AnimatePresence>
                { movies.map( movie => (
                    <motion.li 
                        key={movie.id}
                        layout
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: -20 }}
                        exit={{ opacity: 0, y: 0 }}
                        transition={{ duration: 0.2 }}
                    >
                        <MovieListItem movie={movie} />
                    </motion.li>
                ))}
            </AnimatePresence>
        </ul>
    )
}