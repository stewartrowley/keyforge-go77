const routes = require('express').Router();
const card = require('./card');
const deck = require('./deck');
const house = require('./house');
const set = require('./set');
const event = require('./event');

routes.use('/', require('./swagger'));
routes.use('/card', card);
routes.use('/deck', deck);
routes.use('/house', house);
routes.use('/set', set);
routes.use('/event', event);

routes.get('/', (req, res) => {
  res.send('Stewart Rowley');
});

module.exports = routes;
