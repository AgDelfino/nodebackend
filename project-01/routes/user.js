const express = require('express')
const router = express.Router()
const { handleGetAllUsers, handleGetUserById, handlePatchUser, handleDeleteUser, handleCreateUser} = require('../controllers/user')

// Routes:
router.route('/').get(handleGetAllUsers).post(handleCreateUser)

router.route('/:id')
    .get(handleGetUserById)
    .patch(handlePatchUser)
    .delete(handleDeleteUser)


module.exports = router