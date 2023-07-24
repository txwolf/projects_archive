const router = require('express').Router()
const Post = require('../models/Post')
const User = require('../models/User')

// create a post
router.post('/', async (req, res) => {
  const newPost = new Post(req.body)
  const savedPost = await newPost.save().catch(err =>
    res.status(500).json(err)
  )
  res.status(200).json(savedPost)
})
  
// update a post
router.put('/:id', async (req, res) => {
  const post = await Post.findById(req.params.id)
  if (post.userId === req.body.userId) {
    const updatedPost = await post.updateOne({$set: req.body}).catch(err =>
      res.status(500).json(err)
    )
    res.status(200).json('The post has been updated')
  } else {
    res.status(401).json({ message: 'You can only update your own posts' })
  } 
})

// delete a post
router.delete('/:id', async (req, res) => {
  const post = await Post.findById(req.params.id)
  if (post.userId === req.body.userId) {
    const deletedPost = await post.deleteOne().catch(err =>
      res.status(500).json(err)
    )
    res.status(200).json('The post has been deleted')
  } else {
    res.status(401).json({ message: 'You can only delete your own posts' })
  }
})

// like a post
router.put('/:id/like', async (req, res) => {
  const post = await Post.findById(req.params.id)
  if (!post.likes.includes(req.body.userId)) {
    const updatedPost = await post.updateOne({$push: {likes: req.body.userId}}).catch(err =>
      res.status(500).json(err)
    )
    res.status(200).json('The post has been liked')
  } else {
    const updatedPost = await post.updateOne({$pull: {likes: req.body.userId}}).catch(err =>
      res.status(500).json(err)
    )
    res.status(200).json('The post has been disliked')
  }
})

// get a post
router.get('/:id', async (req, res) => {
  const post = await Post.findById(req.params.id)
  res.status(200).json(post)
})

// get timeline posts
router.get('/timeline/all', async (req, res) => {
  try {
    const currentUser = await User.findById(req.body.userId)
    const userPosts = await Post.find({ userId: req.body.userId })
    const friendPosts = await Promise.all(
      currentUser.following.map(friendId => {
        return Post.find({ userId: friendId })
      })
    )
    res.status(200).json(userPosts.concat(friendPosts));
  } catch (err) {
    res.status(500).json(err)
  }
})

module.exports = router