const routes = require('express').Router();
const house = require('../controller/house');

routes.post('/', house.create);
routes.get('/', house.findAll);
routes.get('/:_id', house.findOne);
routes.put('/:_id', house.updateHouse)

module.exports = routes;