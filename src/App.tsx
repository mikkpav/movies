import './App.css';
import LeftMenu from './features/menu/LeftMenu';
import ContentArea from './ContentArea';
import { Route, Routes } from 'react-router-dom';
import MovieListPage from './features/popular/pages/MovieListPage';
import FilmIcon from './assets/film.png';
import MovieDetailsPage from './features/details/pages/MovieDetailsPage';
import FavoriteListPage from './features/favorites/pages/FavoriteListPage';
import { FavoritesProvider } from './contexts/FavoritesContext';
import { useAuth } from './contexts/useAuth';

function App() {
    // const { user, loading } = useAuth();

    // if (loading) return <div>Loading...</div>;
    // if (!user) return <div>Please log in</div>;

    return (
        <FavoritesProvider>
            <div className="flex flex-col gap-10 m-4 md:m-0 md:pb-6">
                <header className="flex justify-center max-h-30 pt-6">
                    <img src={FilmIcon} className="object-contain max-w-20"></img>
                    <h1 className="text-center p-6 text-4xl font-bold">Movies</h1>
                </header>
                <div className="flex flex-col md:flex-row gap-10 md:gap-4">                
                    <LeftMenu />
                    <ContentArea>
                        <Routes>
                            <Route path="/" element={<MovieListPage />} />
                            <Route
                                path="/favorites"
                                element={<FavoriteListPage />}
                            />
                            <Route
                                path="/movie/:id"
                                element={<MovieDetailsPage />}
                            />
                        </Routes>
                    </ContentArea>
                </div>
            </div>
        </FavoritesProvider>
    );
}

export default App;
