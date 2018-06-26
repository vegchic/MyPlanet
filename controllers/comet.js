const Controller = require('./prototype');
const { genValidator } = require('../services/validator');
const { TYPE } = require('../services/types');

module.exports = () => new Controller(TYPE.COMET,
                            genValidator(['name', 'cycle', 'mass', 'diameter'], ['feature', 'image']));