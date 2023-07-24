import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

const Register = () => {
  const [inputs, setInputs] = useState({
    username: '',
    email: '',
    password: '',
  })
  const [error, setError] = useState('')

  const navigate = useNavigate()

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const res = await axios.post('/auth/register', inputs)
      navigate('/login')
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
          type="email"
          placeholder="email"
          name="email"
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
          Register
        </button>
        {error && <p>{error}</p>}
        <span>
          Do you already have an account? <Link to="/login">Login</Link>
        </span>
      </form>
    </div>
  )
}

export default Register
