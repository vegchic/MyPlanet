const Controller = require('./prototype');
const { genValidator } = require('../services/validator');
const { TYPE } = require('../services/types');

module.exports = () => new Controller(TYPE.SATELLITE, 
                        genValidator(['name', 'diameter', 'mass', 'cycle'], ['feature', 'image']));