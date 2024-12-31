const routes = require('express').Router();
const card = require('../controller/card');

routes.post('/', card.create);
routes.get('/', card.findAll);
routes.get('/:_id', card.findOne);
routes.put('/:_id', card.updateCard)

module.exports = routes;