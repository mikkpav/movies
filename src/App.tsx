import './App.css';
import LeftMenu from './LeftMenu';
import ContentArea from './ContentArea';
import { Route, Routes } from 'react-router-dom';
import MovieListPage from './features/popular/pages/MovieListPage';
import FilmIcon from './assets/film.png';
import MovieDetailsPage from './features/details/pages/MovieDetailsPage';
import FavoriteListPage from './features/favorites/pages/FavoriteListPage';
import { FavoritesProvider } from './features/favorites/hooks/FavoritesContext';

function App() {
    return (
        <div className='flex flex-col gap-10 m-4 md:m-0 md:pb-6'>
            <header className="flex justify-center max-h-30 pt-6">
                <img src={FilmIcon} className="object-contain max-w-20"></img>
                <h1 className="text-center p-6 text-4xl font-bold">Movies</h1>
            </header>
            <div className='flex flex-col md:flex-row gap-10 md:gap-4'>
                <FavoritesProvider>
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
                </FavoritesProvider>
            </div>
        </div>
    );
}

export default App;
