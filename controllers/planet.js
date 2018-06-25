const Controller = require('./prototype');
const { genValidator } = require('../services/validator');

module.exports = new Controller('planet', 
                    genValidator(['name', 'gas', 'diameter', 'mass', 'age', 'gravity'], ['feature', 'image']));