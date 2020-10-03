import {
  anyAsync,
  appendAsync,
  avgAsync,
  emitAsync,
  prependAsync,
  groupAsync,
  joinAsync,
  distinctAsync,
  executeAsync,
  firstAsync,
  flattenAsync,
  skipWhileAsync,
  toObjectAsync,
  allAsync,
  reduceAndMapAsync,
  lastAsync,
  repeatAsync,
  skipAsync,
  sortAsync,
  sortByAsync,
  toArrayAsync,
  takeAsync,
  withIndexAsync,
  concatAsync,
  hasExactlyAsync,
  hasLessOrExactlyAsync,
  hasLessThanAsync,
  hasMoreOrExactlyAsync,
  hasMoreThanAsync,
  countAsync,
  reduceAsync,
  topAsync,
  minAsync,
  maxAsync,
  sumAsync,
  containsAsync,
  waitAllAsync,
  combineAsync,
  partitionAsync,
  forEachAsync,
  takeWhileAsync,
  filterAsync,
  mapAsync,
  isDistinctAsync,
} from '../async';
import {
  combineEmitter,
  concatEmitter,
  mergeEmitter,
  mergeEmitterCatching,
} from '../emitter';
import { merge, mergeCatching } from '../async-base';
import * as common from '../common';

export const asyncIterableFuncs = {
  ...common,
  withIndex: withIndexAsync,
  takeWhile: takeWhileAsync,
  takeWhileAsync,
  take: takeAsync,
  skipWhile: skipWhileAsync,
  skipWhileAsync,
  skip: skipAsync,
  map: mapAsync,
  mapAsync,
  filter: filterAsync,
  filterAsync,
  append: appendAsync,
  prepend: prependAsync,
  concat: concatAsync,
  repeat: repeatAsync,
  flatten: flattenAsync,
  sort: sortAsync,
  sortBy: sortByAsync,
  distinct: distinctAsync,
  distinctAsync,
  execute: executeAsync,
  merge,
  mergeCatching,
  combine: combineAsync,
  combineEmitter,
  concatEmitter,
  mergeEmitter,
  mergeEmitterCatching,
};

export const asyncSpecial = {
  partition: partitionAsync,
  group: groupAsync,
};

export const asyncResolvingFuncs = {
  count: countAsync,
  first: firstAsync,
  last: lastAsync,
  reduceAndMap: reduceAndMapAsync,
  reduce: reduceAsync,
  all: allAsync,
  any: anyAsync,
  contains: containsAsync,
  emit: emitAsync,
  toArray: toArrayAsync,
  toObject: toObjectAsync,
  forEach: forEachAsync,
  join: joinAsync,
  sum: sumAsync,
  avg: avgAsync,
  top: topAsync,
  min: minAsync,
  max: maxAsync,
  hasExactly: hasExactlyAsync,
  hasLessOrExactly: hasLessOrExactlyAsync,
  hasLessThan: hasLessThanAsync,
  hasMoreOrExactly: hasMoreOrExactlyAsync,
  hasMoreThan: hasMoreThanAsync,
  waitAll: waitAllAsync,
  isDistinct: isDistinctAsync,
};
