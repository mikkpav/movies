import './App.css';
import LeftMenu from './features/menu/LeftMenu';
import ContentArea from './ContentArea';
import { Route, Routes } from 'react-router-dom';
import MovieListPage from './features/popular/pages/MovieListPage';
import FilmIcon from './assets/film.png';
import MovieDetailsPage from './features/details/pages/MovieDetailsPage';
import FavoriteListPage from './features/favorites/pages/FavoriteListPage';
import { FavoritesProvider } from './contexts/FavoritesContext';
import UserIcon from './assets/user.png';
import { useState } from 'react';
import Popover from './components/Popover';
import { useAuth } from './contexts/useAuth';

function App() {
    const [popoverOpen, setPopoverOpen] = useState(false);
    const { user, loading } = useAuth();

    // if (loading) return <div>Loading...</div>;
    // if (!user) return <div>Please log in</div>;

    function handleAccountClick() {
        setPopoverOpen(true);
    }

    function closePopover() {
        setPopoverOpen(false);
    }
    console.log('user in component:', user);
    return (
        <FavoritesProvider>
            <div className="flex flex-col gap-6 m-4 md:m-0 md:pb-6">
                <header className="flex justify-center max-h-30 pt-6">
                    <img src={FilmIcon} className="object-contain max-w-20"></img>
                    <h1 className="text-center p-6 text-4xl font-bold">Movies</h1>
                </header>
                <div className='flex justify-end'>
                    <div className='flex flex-col items-center gap-1 cursor-pointer' onClick={handleAccountClick}>
                        <img src={UserIcon} className='object-contain max-w-6 md:max-w-8'></img>
                        <p className='font-semibold text-sm'>{user ? user.email : 'Signup / login'}</p>
                    </div>
                </div>
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

            { popoverOpen && <Popover isOpen={popoverOpen} closeHandler={closePopover} /> }
        </FavoritesProvider>
    );
}

export default App;
