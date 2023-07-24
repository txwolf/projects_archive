const router = require('express').Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');

router.post('/register', async (req, res) => {
  const userData = await new User({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password
  });
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(userData.password, salt);
    userData.password = hashedPassword;

    const user = await userData.save()
    res.status(200).json(user)
  } catch (err) {
    console.log(err);
  }
})

router.post('/login', async (req, res) => {
  const user = await User.findOne({ email: req.body.email })
    .catch(err => res.status(500).json(err));
  if (!user) {
    res.status(400).json({ message: 'No user with that email address!' });
    return;
  }

  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) {
    res.status(400).json({ message: 'Incorrect password!' });
    return;
  }

  res.status(200).json(user);
})

module.exports = router;