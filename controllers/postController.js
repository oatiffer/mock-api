const Post = require('../models/Post');

// Get a list of posts
async function index(req, res) {
  const queryObj = { ...req.query };
  const excludedFields = ['page', 'sort', 'limit', 'fields'];
  excludedFields.forEach((el) => delete queryObj[el]);

  let queryString = JSON.stringify(queryObj);
  queryString = queryString.replace(
    /\b(gt|gte|lt|lte)\b/g,
    (match) => `$${match}`
  );

  try {
    const posts = await Post.find(JSON.parse(queryString));
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

// Store a newly created post in DB
async function store(req, res) {
  try {
    const newPost = await Post.create(req.body);
    res.status(201).json({
      status: 'success',
      data: { newPost },
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      error,
    });
  }
}

// Display the specified post
async function show(req, res) {
  try {
    const post = await Post.findById(req.params.id);
    res.status(200).json({
      status: 'success',
      data: { post },
    });
  } catch (error) {
    res.status(404).json({
      status: 'fail',
      error,
    });
  }
}

// Update the specified post
async function update(req, res) {
  try {
    const post = Post.findbyIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    res.satatus(204).json({
      status: 'success',
      data: { post },
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      error,
    });
  }
}

// Remove the specified post from DB
async function destroy(req, res) {
  try {
    await Post.findByIdAndDelete(req.params.id);
    res.status(204).json({
      status: 'success',
      data: null,
    });
  } catch (error) {
    res.status(404).json({
      status: 'fail',
      error,
    });
  }
}

module.exports = { index, store, show, update, destroy };
