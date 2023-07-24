import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Menu from '../components/Menu'
import { useLocation } from 'react-router-dom'
import axios from 'axios'
import moment from 'moment'

import { AuthContext } from '../context/authContext'

const Single = () => {
  const [post, setPost] = useState([])
  const navigate = useNavigate()
  const location = useLocation()
  const postId = location.pathname.split('/')[2]

  const { currentUser } = useContext(AuthContext)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`/posts/${postId}`)
        setPost(res.data)
      } catch (err) {
        console.log(err)
      }
    }

    fetchData()
  }, [postId])

  const handleDelete = async () => {
    try {
      await axios.delete(`/posts/${postId}`)
      navigate('/')
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div className="single">
      <div className="content">
        <img src={post?.img} alt="" />
        <div className="user">
          <img src={post?.userImage} alt="" />
          <div className="info">
            <span>{post.username}</span>
            <p>Posted {moment(post.date).fromNow()}</p>
          </div>
          {currentUser.username === post.username && (
            <>
              <div className="edit">
                <Link
                  className="link"
                  to={`/write?edit=${postId}`}
                  state={post}
                >
                  Edit
                </Link>
              </div>
              <div className="delete">
                <Link
                  onClick={handleDelete}
                  className="link"
                  to={`/write?del=002`}
                >
                  Delete
                </Link>
              </div>
            </>
          )}
        </div>

        <h1>{post.title}</h1>
        <p>{post.desc}</p>
      </div>

      <Menu category={post.cat} />
    </div>
  )
}

export default Single
