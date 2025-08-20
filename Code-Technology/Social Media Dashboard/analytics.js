const Post = require('../models/Post');

async function getAnalytics() {
  const users = await User.countDocuments();
  const posts = await Post.countDocuments();
  const likes = await Post.aggregate([
    { $group: { _id: null, total: { $sum: { $size: "$likes" } } } }
  ]);
  return { users, posts, likes: likes[0]?.total || 0 };
}
module.exports = { getAnalytics };
