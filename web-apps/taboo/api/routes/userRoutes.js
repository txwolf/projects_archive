const User = require("../models/User");
const router = require('express').Router()
const bcrypt = require('bcrypt');

// update user
router.put('/:id', async (req, res) => {
  const { id } = req.params
  if (id === req.body.userId || req.body.isAdmin) {
    if (req.body.password) {
      const salt = await bcrypt.genSalt(10)
      req.body.password = await bcrypt.hash(req.body.password, salt)
    }
    const updatedUser = await User.findByIdAndUpdate(id, { $set: req.body })
      .catch((err) => { res.status(500).json(err) })
    res.status(200).json(updatedUser)
  } else {
    res.status(403).json({ message: "You don't have permission to update this user" })
  }
})

// delete user
router.delete('/:id', async (req, res) => {
  const { id } = req.params
  if (id === req.body.userId || req.body.isAdmin) {
    const deletedUser = await User.findByIdAndDelete(id)
      .catch((err) => { res.status(500).json(err) })
    res.status(200).json(deletedUser)
  } else {
    res.status(403).json({ message: "You don't have permission to delete this user" })
  }
})

// get a user
router.get('/:id', async (req, res) => {
  const { id } = req.params
  const user = await User.findById(id)
    .catch((err) => { res.status(500).json(err) })
  const {password, updatedAt, createdAt, __v, ...other} = user._doc
  return res.status(200).json(other)
})

// follow a user
router.put('/:id/follow', async (req, res) => {
  const { id } = req.params
  if (req.body.userId !== id) {
    const user = await User.findById(id)
    const currentUser = await User.findById(req.body.userId)
    if (!user.following.includes(id)) {
      try {
        await user.updateOne({ $push: { followers: req.body.userId } })
        await currentUser.updateOne({ $push: { following: id } })
        res.status(200).json({ message: "You are following this user" })
      } catch (err) {
        res.status(500).json(err)
      }
    } else {
      return res.status(403).json({ message: "You are already following this user" })
    }
  } else {
    res.status(403).json({ message: "You can't follow yourself" })
  }
})

// unfollow a user
router.put('/:id/unfollow', async (req, res) => {
  const { id } = req.params
  if (req.body.userId !== id) {
    const user = await User.findById(id)
    const currentUser = await User.findById(req.body.userId)
    if (user.followers.includes(req.body.userId)) {
      try {
        await user.updateOne({ $pull: { followers: req.body.userId } })
        await currentUser.updateOne({ $pull: { following: id } })
        res.status(200).json({ message: "You unfollowed this user" })
      } catch (err) {
        res.status(500).json(err)
      }
    } else {
      return res.status(403).json({ message: "You don't follow this user" })
    }
  } else {
    res.status(403).json({ message: "You can't unfollow yourself" })
  }
}
)

module.exports = router;