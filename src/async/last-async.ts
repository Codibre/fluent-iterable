import { lastRecipe } from '../recipes';
import { reduceAsync } from './reduce-async';

export const lastAsync = lastRecipe(
  reduceAsync,
  (predicate) => async (current, next) =>
    (await predicate(next)) ? next : current,
);
