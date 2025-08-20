const express = require('express');
const Post = require('../models/Post');
const router = express.Router();

// Like post
router.post('/:id/like', async (req, res) => {
  const post = await Post.findByIdAndUpdate(
    req.params.id,
    { $addToSet: { likes: req.body.userId } },
    { new: true }
  );
  res.json(post);
});

// Add comment
router.post('/:id/comment', async (req, res) => {
  const {userId, text} = req.body;
  const post = await Post.findByIdAndUpdate(
    req.params.id,
    { $push: { comments: { user: userId, text } } },
    { new: true }
  );
  res.json(post);
});

// Follow (in User routes)
router.post('/user/:id/follow', async (req, res) => {
  // Add req.body.followerId to User.followers and req.params.id to follower.following
});