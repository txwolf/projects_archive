import './App.css'
import Login from './components/Login'
import { useEffect, useState } from 'react'
import { getTokenFromUrl } from './spotify'
import SpotifyWebApi from 'spotify-web-api-js'
import Player from './components/Player'
import { useDataLayerValue } from './DataLayer'

const spotify = new SpotifyWebApi()

function App() {
  const [{ user, token }, dispatch] = useDataLayerValue()

  // handle login
  useEffect(() => {
    const hash = getTokenFromUrl()
    window.location.hash = ''
    const _token = hash.access_token
    if (_token) {
      dispatch({
        type: 'SET_TOKEN',
        token: _token,
      })
      spotify.setAccessToken(_token)
      spotify.getMe().then((user) => {
        dispatch({ type: 'SET_USER', user })
      })
      spotify.getUserPlaylists().then((playlists) => {
        dispatch({ type: 'SET_PLAYLISTS', playlists })
      })
      spotify.getPlaylist('37i9dQZEVXcLE4sZQgXinL').then((discoverWeekly) => {
        dispatch({ type: 'SET_DISCOVER_WEEKLY', discoverWeekly })
      })
    }
  }, [user, token])

  return (
    <div className="app">
      {token ? <Player spotify={spotify} /> : <Login />}
    </div>
  )
}

export default App
