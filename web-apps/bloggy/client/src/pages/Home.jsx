import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { useLocation } from 'react-router-dom'

const Home = () => {
  const [posts, setPosts] = useState([])

  const category = useLocation().search

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get('/posts' + category)
        setPosts(res.data)
      } catch (err) {
        console.log(err)
      }
    }

    fetchData()
  }, [category])

  const postsDummy = [
    {
      id: '001',
      title: 'The Benefits of Yoga for Mind and Body',
      desc: 'Yoga is a popular practice that has been shown to have numerous benefits for both physical and mental health. In this post, we explore the various ways that practicing yoga can improve your well-being, including reducing stress and anxiety, improving flexibility and balance, and promoting relaxation.',
      img: 'https://dummyimage.com/600x400/000/fff&text=Yoga',
    },
    {
      id: '002',
      title: 'The Top 10 Destinations for Adventure Travelers',
      desc: 'For those who love to explore and push their limits, adventure travel can be an incredible experience. In this post, we highlight some of the best destinations around the world for adventure travel, from trekking in the Himalayas to diving in the Great Barrier Reef.',
      img: 'https://dummyimage.com/600x400/000/fff&text=Adventure',
    },
    {
      id: '003',
      title: 'The Importance of Time Management in Your Daily Life',
      desc: 'Time management is a crucial skill that can help you achieve your goals and live a more fulfilling life. In this post, we discuss the benefits of effective time management and share some practical tips for improving your time management skills.',
      img: 'https://dummyimage.com/600x400/000/fff&text=Time+Management',
    },
  ]

  const getText = (html) => {
    const doc = new DOMParser().parseFromString(html, 'text/html')
    return doc.body.textContent
  }

  return (
    <div className="home">
      <div className="posts">
        {posts.map((post) => (
          <div className="post" key={post.id}>
            <div className="img">
              <img src={post.img} alt="" />
            </div>
            <div className="content">
              <Link className="link" to={`/posts/${post.id}`}>
                <h1>{post.title}</h1>
                <p>{getText(post.desc)}</p>
                <button>Read More</button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Home
