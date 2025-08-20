const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const router = express.Router();

// Register
router.post('/register', async (req, res) => {
  const {email, password, name} = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = new User({email, password: hashedPassword, name});
  await user.save();
  res.json(user);
});

// Login
router.post('/login', async (req, res) => {
  const {email, password} = req.body;
  const user = await User.findOne({email});
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({error: 'Invalid credentials'});
  }
  const token = jwt.sign({id: user._id, isAdmin: user.isAdmin}, process.env.JWT_SECRET, {expiresIn: '7d'});
  res.json({token});
});

module.exports = router;
