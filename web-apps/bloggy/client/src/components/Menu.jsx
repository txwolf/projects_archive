import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

const Menu = ({ category }) => {
  const [posts, setPosts] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get('/posts/?cat=' + category)
        setPosts(res.data)
      } catch (err) {
        console.log(err)
      }
    }

    fetchData()
  }, [category])

  return (
    <div className="menu">
      <h1>Other posts you may like</h1>
      {posts.map((post) => (
        <div className="post" key={post.id}>
          <img src={post.img} alt="" />
          <h2>{post.title}</h2>
          <button>
            {' '}
            <Link className="link" to={`/posts/${post.id}`}>
              Read More{' '}
            </Link>
          </button>
        </div>
      ))}
    </div>
  )
}

export default Menu
