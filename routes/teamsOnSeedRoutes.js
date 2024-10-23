const express = require('express')
var Router = express.Router()

const{
    getAllTeamsOnSeed,
    getTeamsOnSeedById,
    createTeamsOnSeed,
    deleteTeamsOnSeed
} = require('../controllers/teamsOnSeedController.js')

Router.get('/', getAllTeamsOnSeed);

Router.post('/', createTeamsOnSeed);

Router.get('/:seedid', getTeamsOnSeedById);

Router.delete('/', deleteTeamsOnSeed);

module.exports = Router