const routes = require('express').Router();
const deck = require('../controller/deck');

routes.post('/', deck.create);
routes.get('/', deck.findAll);
routes.get('/:_id', deck.findOne);
routes.put('/:_id', deck.updateDeck)

module.exports = routes;