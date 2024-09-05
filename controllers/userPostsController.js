const Post = require('../models/Post');

// Get a list of posts for a specified user
async function index(req, res) {
  const queryObj = { ...req.query };
  const excludedFields = ['page', 'sort', 'limit', 'fields'];
  excludedFields.forEach((el) => delete queryObj[el]);

  let queryString = JSON.stringify(queryObj);
  queryString = queryString.replace(
    /\b(name|username|email)\b/g,
    (match) => `$${match}`
  );

  try {
    const posts = await Post.find({
      userId: req.params.id,
      ...JSON.parse(queryString),
    });
    res.status(200).json({
      status: 'success',
      results: posts.length,
      data: { posts },
    });
  } catch (error) {
    res.status(404).json({
      status: 'fail',
      error,
    });
  }
}

module.exports = { index };
