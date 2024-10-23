const express = require('express')
var Router = express.Router()

const{
    getAllSeeds,
    getSeedById,
    createSeed,
    updateSeed,
    deleteSeed
} = require('../controllers/seedController.js')

Router.get('/', getAllSeeds);

Router.post('/', createSeed);

Router.get('/:id', getSeedById);

Router.delete('/:id', deleteSeed);

Router.put('/:id', updateSeed);

module.exports = Router