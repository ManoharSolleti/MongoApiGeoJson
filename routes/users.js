const express = require('express');
const {
  getUsers,
  addUser,
  updateUser,
  deleteUser,
} = require('../controllers/users');

const router = express.Router();

router.route('/').get(getUsers).post(addUser);

router.route('/:id').patch(updateUser).delete(deleteUser);

module.exports = router;
