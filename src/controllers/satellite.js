import Controller from './prototype';
import { genValidator } from '../services/validator';
import { TYPE } from '../services/types';

export default () => new Controller(TYPE.SATELLITE, 
                        genValidator(['name', 'diameter', 'mass', 'cycle'], ['feature', 'image']));