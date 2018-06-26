const Controller = require('./prototype');
const { genValidator } = require('../services/validator');
const { TYPE } = require('../services/types');

module.exports = () => new Controller(TYPE.STAR, 
                    genValidator(['name', 'age', 'diameter', 'mass'], ['feature', 'image']));