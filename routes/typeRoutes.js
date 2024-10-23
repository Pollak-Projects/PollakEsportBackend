const express = require('express')
var Router = express.Router()

const{
    getAllTypes,
    getTypeByType,
    createType,
    updateType,
    deleteType
} = require('../controllers/typeController.js')

Router.get('/', getAllTypes);

Router.post('/', createType);

Router.get('/:type', getTypeByType);

Router.delete('/:id', deleteType);

Router.put('/:id', updateType);

module.exports = Router