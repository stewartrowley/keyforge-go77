const routes = require('express').Router();
const set = require('../controller/set');

routes.post('/', set.create);
routes.get('/', set.findAll);
routes.get('/:_id', set.findOne);

module.exports = routes;