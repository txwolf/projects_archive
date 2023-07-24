import { db } from '../db.js'
import jwt from 'jsonwebtoken'

export const getPosts = (req, res) => {
  const q = req.query.cat
    ? 'SELECT * FROM posts WHERE cat=?'
    : 'SELECT * FROM posts'

  db.query(q, [req.query.cat], (err, data) => {
    if (err) {
      res.status(500).send(err)
    } else {
      res.status(200).json(data)
    }
  })
}

export const getSinglePost = (req, res) => {
  const q =
    'SELECT p.id, `username`, `title`, `desc`, p.img, u.img AS userImg, `cat`, `date` FROM users u JOIN posts p ON u.id = p.id WHERE p.id = ?'

  db.query(q, [req.params.id], (err, data) => {
    if (err) {
      res.status(500).send(err)
    } else {
      res.status(200).json(data[0])
    }
  })
}

export const addPost = (req, res) => {
  const token = req.cookies.access_token
  if (!token) return res.status(401).json('Not authorized')

  jwt.verify(token, 'jwtkey', (err, data) => {
    if (err) return res.status(403).json('Token not valid')

    const { title, desc, img, cat, date } = req.body
    const q =
      'INSERT INTO posts (`title`, `desc`, `img`, `cat`, `date`, `uid`) VALUES (?,?,?,?,?,?)'
    db.query(q, [title, desc, img, cat, date, data.id], (err, data) => {
      if (err) {
        res.status(500).send(err)
      } else {
        res.status(200).json('Post added successfully')
      }
    })
  })
}

export const deletePost = (req, res) => {
  const token = req.cookies.access_token
  if (!token) return res.status(401).json('Not authorized')

  jwt.verify(token, 'jwtkey', (err, data) => {
    if (err) return res.status(403).json('Token not valid')

    const postId = req.params.id
    const q = 'DELETE FROM posts WHERE `id` = ? AND `uid` = ?'
    db.query(q, [postId, data.id], (err, data) => {
      if (err) {
        res.status(500).send(err)
      } else {
        res.status(200).json('Post deleted successfully')
      }
    })
  })
}

export const updatePost = (req, res) => {
  const token = req.cookies.access_token
  if (!token) return res.status(401).json('Not authorized')

  jwt.verify(token, 'jwtkey', (err, data) => {
    if (err) return res.status(403).json('Token not valid')

    const { title, desc, img, cat, uid } = req.body
    const postId = req.params.id

    const q =
      'UPDATE post SET `title`=?, `desc`=?, `img`=?, `cat`=? WHERE `id` = ? AND `uid` = ?'

    db.query(q, [title, desc, img, cat, postId, uid], (err, data) => {
      if (err) {
        res.status(500).send(err)
      } else {
        res.status(200).json('Post has been updated')
      }
    })
  })
}
