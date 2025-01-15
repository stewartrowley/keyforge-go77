const routes = require('express').Router();
const event = require('../controller/event');

routes.post('/', event.create);
routes.get('/', event.findAll);
routes.get('/:_id', event.findId);

module.exports = routes;