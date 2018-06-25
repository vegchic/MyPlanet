const Controller = require('./prototype');
const { genValidator } = require('../services/validator');

module.exports = new Controller('satellite', 
                    genValidator(['name', 'diameter', 'mass', 'cycle'], ['feature', 'image']));