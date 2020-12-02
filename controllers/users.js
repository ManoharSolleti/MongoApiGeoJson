const User = require('../models/User');

// @desc  Get all users
// @route GET /api/v1/users
// @access Public
exports.getUsers = async (req, res, next) => {
  try {
    const users = await User.find();

    return res.status(200).json({
      data: users,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};

// @desc  Create an user
// @route POST /api/v1/users
// @access Public
exports.addUser = async (req, res, next) => {
  try {
    const user = await User.create(req.body);

    return res.status(201).json({
      success: true,
      data: user,
    });
  } catch (err) {
    console.error(err);
    if (err.code === 11000) {
      return res.status(400).json({ error: 'This user already exists' });
    }
    res.status(500).json({ error: 'Server error' });
  }
};

// @desc  update an user
// @route POST /api/v1/users
// @access Public
exports.updateUser = async (req, res, next) => {
  try {
    console.log('i am in update user');
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};