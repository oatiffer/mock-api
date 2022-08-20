const User = require('../models/User');

// Get a list of users
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
    const users = await User.find(JSON.parse(queryString));
    res.status(200).json({
      status: 'success',
      results: users.length,
      data: { users },
    });
  } catch (error) {
    res.status(404).json({
      status: 'fail',
      error,
    });
  }
}

// Store a newly created user in DB
async function store(req, res) {
  try {
    const newUser = await User.create(req.body);
    res.status(201).json({
      status: 'success',
      data: { newUser },
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      error,
    });
  }
}

// Display the specified user
async function show(req, res) {
  try {
    const user = await User.findById(req.params.id);
    res.status(200).json({
      status: 'success',
      data: { user },
    });
  } catch (error) {
    res.status(404).json({
      status: 'fail',
      error,
    });
  }
}

// Update the specified user
async function update(req, res) {
  try {
    const user = User.findbyIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(204).json({
      status: 'success',
      data: { user },
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      error,
    });
  }
}

// Remove the specified user from DB
async function destroy(req, res) {
  try {
    await User.findByIdAndDelete(req.params.id);
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
