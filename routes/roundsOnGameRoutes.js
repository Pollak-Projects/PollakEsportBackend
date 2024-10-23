const express = require('express')
var Router = express.Router()

const{
    getAllRoundsOnGames,
    getRoundOnGameById,
    createRoundsOnGame,
    deleteRoundsOnGame
} = require('../controllers/roundsOnGameController.js')

Router.get('/', getAllRoundsOnGames);

Router.post('/', createRoundsOnGame);

Router.get('/:gameid', getRoundOnGameById);

Router.delete('/', deleteRoundsOnGame);

module.exports = Router