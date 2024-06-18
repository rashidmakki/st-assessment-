const express = require('express');
const router = express.Router();
const {createUser, getAllUsers, getUserById, updateUser, deleteUser} = require('../controller/user.controller');

router.route('/').post(createUser).get(getAllUsers)
router.route('/:id').get(getUserById).put(updateUser).delete(deleteUser)

module.exports = router;
