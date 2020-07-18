import { reduceAndMapAsync } from './reduce-and-map-async';
import { groupRecipe } from '../recipes';
import { resolverAsync, iterateAsync } from '../utils';
import { map } from '../sync';

export const groupAsync = groupRecipe(
  reduceAndMapAsync,
  resolverAsync,
  map,
  iterateAsync,
);
