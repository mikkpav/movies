import type { MovieDetails } from '../../../types/movies';
import MovieListItem from '../../../components/MovieListItem';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../../../contexts/useAuth';

type FavoriteListProps = {
    favoriteMovies: MovieDetails[];
};

export default function FavoriteList({ favoriteMovies }: FavoriteListProps) {
    const { user } = useAuth();

    const emptyListLabel = user ? 'Log in to save favorites' : 'No favorites selected'

    return favoriteMovies.length ? (
        <ul className="flex flex-col gap-4">
            <AnimatePresence>
                {favoriteMovies.map((movie) => (
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
    ) : (
        <div className="flex w-full items-center">
            <p className="w-full text-center">{emptyListLabel}</p>
        </div>
    );
}
