const User = require('../models/users')

async function handleGetAllUsers(req, res) {
    const allDbUsers = await User.find({})
    return res.status(200).json(allDbUsers)
}

async function handleGetUserById(req, res) {
    const user = await User.findById(req.params.id)
    if(!user) return res.status(404).json({msg: 'User not found'})
    return res.status(200).json(user)
}

async function handlePatchUser (req, res) {

    await User.findByIdAndUpdate(req.params.id, {lastName: req.body.last_name})
    return res.status(201).json({msg: 'Updated successfully'})
}

async function handleDeleteUser (req, res) {
    await User.findByIdAndDelete(req.params.id)
    return res.status(204).json({msg: 'Deleted successfully'})
}

async function handleCreateUser (req, res){
    const body = req.body
    const newUser = await User.create({
        firstName: body.first_name,
        lastName: body.last_name,
        email: body.email,
        gender: body.gender,
        jobTitle: body.job_title
    })
    console.log('New user created', newUser)
    res.status(201).json({msg: 'New user created', id: newUser._id})
}

module.exports = {
    handleGetAllUsers,
    handleGetUserById,
    handlePatchUser,
    handleDeleteUser,
    handleCreateUser,
}