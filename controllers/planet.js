const Controller = require('./prototype');
const { genValidator } = require('../services/validator');
const { TYPE } = require('../services/types');

module.exports = () => new Controller(TYPE.PLANET, 
                    genValidator(['name', 'cycle', 'diameter', 'mass', 'age', 'gravity'], ['feature', 'image']));