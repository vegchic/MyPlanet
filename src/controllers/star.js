import Controller from './prototype';
import { genValidator } from '../services/validator';
import { TYPE } from '../services/types';

export default () => new Controller(TYPE.STAR, 
                    genValidator(['name', 'age', 'diameter', 'mass'], ['feature', 'image']));