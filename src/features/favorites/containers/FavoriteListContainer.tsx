import FavoriteList from '../components/FavoriteList';
import { useFavoriteMovies } from '../hooks/useFavoriteMovies';

export default function FavoriteListContainer() {
    const { favoriteMovies, loading } = useFavoriteMovies();

    if (loading) return <></>;

    return (
        <div className="flex flex-col gap-10">
            <h1 className="header-font">Your chosen favorite movies</h1>
            <FavoriteList favoriteMovies={favoriteMovies} />
        </div>
    );
}
