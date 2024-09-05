const User = require('../models/User');

// Get a list of users
async function index(req, res) {
  let queryObj = { ...req.query };
  const excludedFields = ['page', 'sort', 'limit', 'fields'];
  excludedFields.forEach((el) => delete queryObj[el]);

  if (Object.keys(queryObj).length === 1) {
    queryObj = Object.entries(queryObj).map(([key, val]) => {
      const obj = { [key]: { $regex: new RegExp(val), $options: 'i' } };
      return obj;
    })[0];
  } else if (Object.keys(queryObj).length > 1) {
    queryObj = Object.entries(queryObj).reduce(([pKey, pVal], [cKey, cVal]) => {
      let obj = { [cKey]: { $regex: new RegExp(cVal), $options: 'i' } };
      obj = { ...obj, [pKey]: { $regex: new RegExp(pVal), $options: 'i' } };
      return obj;
    });
  }

  try {
    const users = await User.find(queryObj);

    // if (Object.keys(queryObj).length) {
    //   users = users.filter((user) =>
    //     user.name.toLowerCase().includes(queryObj.name.toLowerCase())
    //   );
    // }

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
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
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
