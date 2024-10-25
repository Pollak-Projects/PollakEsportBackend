const express = require('express')
var Router = express.Router()

const{
    getAllUsersOnTeams,
    getUsersOnTeamById,
    createUsersOnTeam,
    deleteUsersOnTeam,
    userJoinByCode
} = require('../controllers/usersOnTeamController.js')

Router.get('/', getAllUsersOnTeams);

Router.post('/', createUsersOnTeam);

Router.post('/join/:code', userJoinByCode)

Router.get('/:teamid', getUsersOnTeamById);

Router.delete('/', deleteUsersOnTeam);

module.exports = Router