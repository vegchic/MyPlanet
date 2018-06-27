import Controller from './prototype';
import { genValidator } from '../services/validator';
import { TYPE } from '../services/types';

export default () => new Controller(TYPE.COMET,
                            genValidator(['name', 'cycle', 'mass', 'diameter'], ['feature', 'image']));