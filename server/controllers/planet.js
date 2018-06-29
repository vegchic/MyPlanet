import Controller from './prototype';
import { genValidator } from '../services/validator';
import { TYPE } from '../services/types';

export default () => new Controller(TYPE.PLANET, 
                    genValidator(['name', 'cycle', 'diameter', 'mass', 'age', 'gravity'], ['feature', 'image']));