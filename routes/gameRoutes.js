const express = require('express')
var Router = express.Router()

const{
    getAllGames,
    getGameById,
    createGame,
    updateGame,
    deleteGame
} = require('../controllers/gameController.js')

Router.get('/', getAllGames);

Router.post('/', createGame);

Router.get('/:id', getGameById);

Router.delete('/:id', deleteGame);

Router.put('/:id', updateGame);

module.exports = Router