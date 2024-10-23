const express = require('express')
var Router = express.Router()

const{
    getAllGamesForCards,
    getDataForBrackets
} = require('../controllers/mixedController.js')

Router.get('/gamesforcards', getAllGamesForCards);

Router.get('/dataforbrackets/:gameid', getDataForBrackets);

module.exports = Router