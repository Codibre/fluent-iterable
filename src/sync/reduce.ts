import { getReduce } from '../common/get-reduce';
import { reduceAndMap } from './reduce-and-map';

export const reduce = getReduce(reduceAndMap);
