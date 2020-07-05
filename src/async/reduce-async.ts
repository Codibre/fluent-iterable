import { getReduce } from '../recipes/get-reduce';
import { reduceAndMapAsync } from './reduce-and-map-async';

export const reduceAsync = getReduce(reduceAndMapAsync);
