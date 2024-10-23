const express = require('express')
var Router = express.Router()

const{
    getAllVariants,
    getVariantByName,
    createVariant,
    updateVariant,
    deleteVariant
} = require('../controllers/variantController.js')

Router.get('/', getAllVariants);

Router.post('/', createVariant);

Router.get('/:name', getVariantByName);

Router.delete('/:id', deleteVariant);

Router.put('/:id', updateVariant);

module.exports = Router