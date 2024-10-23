const express = require('express')
var Router = express.Router()

const{
    getAllGameVariants,
    getGameVariantByGameId,
    createGameVariant,
    deleteGameVariant
} = require('../controllers/gameVariantsController.js')

Router.get('/', getAllGameVariants);

Router.post('/', createGameVariant);

Router.get('/:gameid', getGameVariantByGameId);

Router.delete('/', deleteGameVariant);

module.exports = Router