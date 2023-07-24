import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Outlet,
} from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import Write from './pages/Write'
import Single from './pages/Single'

import './style.scss'

const Layout = () => {
  return (
    <>
      <Navbar></Navbar>
      <Outlet></Outlet>
      <Footer></Footer>
    </>
  )
}

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/posts/:id',
        element: <Single />,
      },
      {
        path: '/write',
        element: <Write />,
      },
    ],
  },
  {
    path: '/register',
    element: <Register />,
  },
  {
    path: '/login',
    element: <Login />,
  },
])

function App() {
  return (
    <div className="app">
      <div className="container">
        <RouterProvider router={router} />
      </div>
    </div>
  )
}

export default App
