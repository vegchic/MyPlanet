const CONFIG = require('../config');

module.exports = require('knex')(CONFIG.knex);
