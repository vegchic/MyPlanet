const Controller = require('./prototype');
const { genValidator } = require('../services/validator');

module.exports = new Controller('star', 
                    genValidator(['name', 'age', 'diameter', 'mass'], ['feature', 'image']));