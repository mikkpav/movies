import './App.css'
import LeftMenu from './LeftMenu'
import ContentArea from './ContentArea'
import { Route, Routes } from 'react-router-dom'
import MovieListPage from './features/popular/pages/MovieListPage'
import FilmIcon from './assets/film.png'
import MovieDetailsPage from './features/details/pages/MovieDetailsPage'
import FavoriteListPage from './features/favorites/pages/FavoriteListPAge'

function App() {
  return (
    <div className='flex flex-col gap-10'>
      <header className='flex justify-center max-h-30 pt-6'>
        <img src={FilmIcon} className='object-contain max-w-20'></img>
        <h1 className='text-center p-6 text-4xl font-bold'>Movies</h1>
      </header>
      <div className='flex flex-row gap-4'>
        <LeftMenu />
        <ContentArea>
          <Routes>
            <Route path='/' element={ <MovieListPage /> } />
            <Route path='/favorites' element={ <FavoriteListPage /> } />
            <Route path='/movie/:id' element={ <MovieDetailsPage /> } />
          </Routes>
        </ContentArea>
      </div>
    </div>
  )
}

export default App
