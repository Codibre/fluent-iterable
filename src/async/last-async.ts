import { getLast } from '../common/get-last';
import { reduceAsync } from './reduce-async';

export const lastAsync = getLast(
  reduceAsync,
  (predicate) => async (current, next) =>
    (await predicate(next)) ? next : current,
);
