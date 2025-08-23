import FavoriteList from '../components/FavoriteList';
import { useFavoriteMovies } from '../hooks/useFavoriteMovies';


export default function FavoriteListContainer() {
    const { favoriteMovies, loading } = useFavoriteMovies();
 
    if (loading) return <></>;

    return <FavoriteList favoriteMovies={favoriteMovies} />;
}