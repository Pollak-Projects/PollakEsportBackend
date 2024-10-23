const express = require('express')
var Router = express.Router()

const{
    getAllTeams,
    getTeamByName,
    createTeam,
    updateTeam,
    deleteTeam
} = require('../controllers/teamController.js')

Router.get('/', getAllTeams);

Router.post('/', createTeam);

Router.get('/:name', getTeamByName);

Router.delete('/:id', deleteTeam);

Router.put('/:id', updateTeam);

module.exports = Router