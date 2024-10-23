const express = require('express')
var Router = express.Router()

const{
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser
} = require('../controllers/userController.js')

Router.get('/', getAllUsers);

Router.post('/', createUser);

Router.get('/:id', getUserById);

Router.delete('/:id', deleteUser);

Router.put('/:id', updateUser);

module.exports = Router