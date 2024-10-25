const express = require('express')
var Router = express.Router()

const{
    getAllGamesForCards,
    getDataForBrackets,
    getTeamsWithUsers,
    updateScores
} = require('../controllers/mixedController.js')

Router.get('/gamesforcards', getAllGamesForCards);

Router.get('/dataforbrackets/:gameid', getDataForBrackets);

Router.get('/teams/:teamid', getTeamsWithUsers);

Router.post('/scores/', updateScores);

module.exports = Router