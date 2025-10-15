const express = require('express');
const { getUsers, addUser, deleteUser } = require('../controllers/userController');

const router = express.Router();

router.route('/')
  .get(getUsers)
  .post(addUser);

router.route('/:index')
  .delete(deleteUser);

module.exports = router;