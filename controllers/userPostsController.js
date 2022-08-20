const Post = require('../models/Post');

// Get a list of posts for a specified user
async function index(req, res) {
  try {
    const posts = await Post.find({ userId: req.params.id });
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json({ message: err });
  }
}

module.exports = { index };
