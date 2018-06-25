const Controller = require('./prototype');
const { genValidator } = require('../services/validator');

module.exports = new Controller('comet', 
                    genValidator(['name', 'cycle', 'discover'], ['feature', 'image']));