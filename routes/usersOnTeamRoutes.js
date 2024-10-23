const express = require('express')
var Router = express.Router()

const{
    getAllUsersOnTeams,
    getUsersOnTeamById,
    createUsersOnTeam,
    deleteUsersOnTeam
} = require('../controllers/usersOnTeamController.js')

Router.get('/', getAllUsersOnTeams);

Router.post('/', createUsersOnTeam);

Router.get('/:teamid', getUsersOnTeamById);

Router.delete('/', deleteUsersOnTeam);

module.exports = Router