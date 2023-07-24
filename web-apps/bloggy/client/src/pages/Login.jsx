import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/authContext'

const Login = () => {
  const [inputs, setInputs] = useState({
    username: '',
    password: '',
  })

  const [error, setError] = useState('')

  const navigate = useNavigate()

  const { login } = useContext(AuthContext)

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      login(inputs)
      navigate('/')
    } catch (err) {
      setError(err.response.data)
    }
  }

  return (
    <div className="auth">
      <h1>Login</h1>
      <form action="">
        <input
          onChange={handleChange}
          type="text"
          placeholder="username"
          name="username"
          id=""
        />
        <input
          onChange={handleChange}
          type="password"
          placeholder="password"
          name="password"
          id=""
        />
        <button onClick={handleSubmit} type="submit">
          Login
        </button>
        {error && <p>{error}</p>}
        <span>
          Don't you have an account? <Link to="/register">Register</Link>
        </span>
      </form>
    </div>
  )
}

export default Login
