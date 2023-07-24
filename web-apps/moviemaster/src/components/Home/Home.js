import React, { useEffect } from 'react'
import MovieListing from '../MovieListing/MovieListing'
import { useDispatch, useSelector } from 'react-redux'
import {
  fetchAsyncMovies,
  fetchAsyncShows,
} from '../../features/movies/movieSlice'
import loader from '../../images/loading.svg'
import './Home.scss'

const Home = () => {
  let loading = useSelector((state) => state.movies.loading)

  console.log(loading)
  const dispatch = useDispatch()
  const movieText = 'Harry'
  const showText = 'friends'

  useEffect(() => {
    dispatch(fetchAsyncMovies(movieText))
    dispatch(fetchAsyncShows(showText))
  }, [dispatch])

  return (
    <div className="banner-img">
      {loading ? (
        <div className="loader">
          <img src={loader} alt="" />
        </div>
      ) : (
        <MovieListing />
      )}
    </div>
  )
}

export default Home
