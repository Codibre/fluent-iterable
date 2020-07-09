import {
  any,
  contains,
  count,
  first,
  hasExactly,
  hasLessThan,
  hasMoreThan,
  toObject,
  toAsync,
  join,
  max,
  min,
  reduce,
  repeat,
  sum,
  take,
  top,
  withIndex,
  skipWhile,
  skip,
  partition,
  append,
  prepend,
  concat,
  flatten,
  sort,
  distinct,
  group,
  last,
  all,
  toArray,
  execute,
  avg,
  reduceAndMap,
  waitAll,
} from '../sync';
import {
  allAsync,
  avgAsync,
  anyAsync,
  concatAsync,
  countAsync,
  firstAsync,
  groupAsync,
  joinAsync,
  lastAsync,
  reduceAsync,
  distinctAsync,
  executeAsync,
  flattenAsync,
  reduceAndMapAsync,
  skipWhileAsync,
  toObjectAsync,
  topAsync,
  minAsync,
  maxAsync,
  sumAsync,
} from '../async';
import { forEach, map, filter, takeWhile } from '../sync-base';
import {
  forEachAsync,
  mapAsync,
  filterAsync,
  takeWhileAsync,
} from '../async-base';

export const helper = {
  withIndex,
  takeWhile,
  take,
  skipWhile,
  skip,
  map,
  filter,
  partition,
  append,
  prepend,
  concat,
  repeat,
  flatten,
  sort,
  distinct,
  group,
  count,
  first,
  last,
  reduceAndMap,
  reduceAndMapAsync,
  reduce,
  all,
  any,
  contains,
  toArray,
  toObject,
  toAsync,
  forEach,
  execute,
  join,
  sum,
  avg,
  top,
  min,
  max,
  hasExactly,
  hasLessThan,
  hasMoreThan,
};
export const iterableFuncs = {
  withIndex,
  takeWhile,
  take,
  skipWhile,
  skip,
  map,
  filter,
  append,
  prepend,
  concat,
  repeat,
  flatten,
  sort,
  distinct,
  execute,
};

export const iterableAsyncFuncs = {
  concatAsync,
  takeWhileAsync,
  skipWhileAsync,
  mapAsync,
  filterAsync,
  flattenAsync,
  distinctAsync,
  executeAsync,
  toAsync,
};

export const special = {
  partition,
  group,
  groupAsync,
};
export const resolvingFuncs = {
  count,
  countAsync,
  first,
  firstAsync,
  last,
  lastAsync,
  reduceAndMap,
  reduceAndMapAsync,
  reduce,
  reduceAsync,
  all,
  allAsync,
  any,
  anyAsync,
  contains,
  toArray,
  toObject,
  toObjectAsync,
  forEach,
  forEachAsync,
  join,
  joinAsync,
  sum,
  sumAsync,
  avg,
  avgAsync,
  top,
  topAsync,
  min,
  minAsync,
  max,
  maxAsync,
  hasExactly,
  hasLessThan,
  hasMoreThan,
  waitAll,
};