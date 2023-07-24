import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Checkout from './components/Checkout'
import Home from './components/Home'
import Login from './components/Login'
import Header from './components/Header'
import { useStateValue } from './components/StateProvider'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { useEffect } from 'react'
import { auth } from './firebase'

function App() {
  const [{ user }, dispatch] = useStateValue()

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        const uid = user.uid
        dispatch({
          type: 'SET_USER',
          user: user,
        })
      } else {
        // User is signed out
        dispatch({
          type: 'SET_USER',
          user: null,
        })
      }
    })
    return () => {
      unsubscribe()
    }
  }, [])

  console.log('user =>', user)

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Header />
                <Home />
              </>
            }
          />
          <Route
            path="/checkout"
            element={
              <>
                <Header />
                <Checkout />
              </>
            }
          />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
