const express = require('express')
var Router = express.Router()

const{
    getAllTeams,
    getTeamByName,
    createTeam,
    updateTeam,
    deleteTeam,
    banTeam,
    unbanTeam,
    getInviteCode
} = require('../controllers/teamController.js')

Router.get('/', getAllTeams);

Router.post('/', createTeam);

Router.get('/:name', getTeamByName);

Router.get('/invitecode/:id', getInviteCode);

Router.delete('/:id', deleteTeam);

Router.put('/:id', updateTeam);

Router.put('/ban/:id', banTeam);

Router.put('/unban/:id', unbanTeam)

module.exports = Router