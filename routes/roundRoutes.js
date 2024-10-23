const express = require('express')
var Router = express.Router()

const{
    getAllRounds,
    getRoundById,
    createRound,
    updateRound,
    deleteRound
} = require('../controllers/roundController.js')

Router.get('/', getAllRounds);

Router.post('/', createRound);

Router.get('/:id', getRoundById);

Router.delete('/:id', deleteRound);

Router.put('/:id', updateRound);

module.exports = Router