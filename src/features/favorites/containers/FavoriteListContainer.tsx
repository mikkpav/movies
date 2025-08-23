import FavoriteList from '../components/FavoriteList';
import { useFavoriteMovies } from '../hooks/useFavoriteMovies';


export default function FavoriteListContainer() {
    const { favoriteMovies } = useFavoriteMovies();
    
    return <FavoriteList favoriteMovies={favoriteMovies} />;
}