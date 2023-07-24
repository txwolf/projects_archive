import React from 'react'
import { Link } from 'react-router-dom'
import user from '../../images/user.png'
import './Header.scss'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import {
  fetchAsyncMovies,
  fetchAsyncShows,
} from '../../features/movies/movieSlice'

const Header = () => {
  const [term, setTerm] = useState('')
  const dispatch = useDispatch()

  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(fetchAsyncMovies(term))
    dispatch(fetchAsyncShows(term))
    setTerm('')
  }

  return (
    <div className="header">
      <div className="logo">
        <Link to="/">Moviemaster</Link>
      </div>
      <div className="search-bar">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={term}
            placeholder="Search movies..."
            onChange={(e) => setTerm(e.target.value)}
          />
          <button type="submit">Search</button>
        </form>
      </div>
      <div className="user-image">
        <img src={user} alt="user" />
      </div>
    </div>
  )
}

export default Header
