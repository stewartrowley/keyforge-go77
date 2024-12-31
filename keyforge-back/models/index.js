const dbConfig = require('../config/db.config.js');

const mongoose = require('mongoose')
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = dbConfig.url;
db.card = require('./card.js')(mongoose);
db.deck = require('./deck.js')(mongoose);
db.house = require('./house.js')(mongoose)
db.set = require('./set.js')(mongoose);

module.exports = db;