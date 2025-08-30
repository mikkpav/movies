import type { MovieDetails } from '../../../types/movies';
import MovieListItem from '../../popular/components/MovieListItem';
import { motion, AnimatePresence } from 'framer-motion';

type FavoriteListProps = {
    favoriteMovies: MovieDetails[];
}

export default function FavoriteList({ favoriteMovies }: FavoriteListProps ) {
    return favoriteMovies.length 
        ? ( 
            <ul className='flex flex-col gap-4'>
                <AnimatePresence>
                    { favoriteMovies.map(movie => (
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
        : (
            <div className='flex w-full items-center'>
                <p className='w-full text-center'>No favorites selected</p>
            </div>
        );
}