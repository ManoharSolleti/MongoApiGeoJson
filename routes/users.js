const express = require('express');
const {
  getUsers,
  addUser
} = require('../controllers/users');

const router = express.Router();

router
  .route('/')
  .get(getUsers)
  .post(addUser)
  // .patch(updateUser)
  // .delete(deleteUser);

module.exports = router;
