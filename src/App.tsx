import './App.css'
import LeftMenu from './LeftMenu'
import ContentArea from './ContentArea'
import { Route, Routes } from 'react-router-dom'
import MovieListPage from './features/popular/pages/MovieListPage'
import FavoritesList from './FavoritesList'
import FilmIcon from './assets/film.png'
import MovieDetailsPage from './features/details/pages/MovieDetailsPage'

function App() {
  return (
    <div className='flex flex-col'>
      <header className='flex max-h-30 px-4'>
        <img src={FilmIcon} className='object-contain max-w-20'></img>
        <h1 className='flex-1 text-center p-6 text-4xl font-bold'>Movies</h1>
      </header>
      <div className='flex flex-row'>
        <LeftMenu />
        <ContentArea>
          <Routes>
            <Route path='/' element={ <MovieListPage /> } />
            <Route path='/favorites' element={ <FavoritesList /> } />
            <Route path='/movie/:id' element={ <MovieDetailsPage /> } />
          </Routes>
        </ContentArea>
      </div>
    </div>
  )
}

export default App
