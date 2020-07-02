import {
  withIndex,
  takeWhile,
  takeWhileAsync,
  take,
  skipWhile,
  skipWhileAsync,
  skip,
  map,
  mapAsync,
  filter,
  firstAsync,
  partition,
  append,
  prepend,
  concat,
  repeat,
  flatten,
  flattenAsync,
  sort,
  distinct,
  distinctAsync,
  group,
  groupAsync,
  count,
  countAsync,
  first,
  filterAsync,
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
  execute,
  executeAsync,
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
  merge,
  mergeCatching,
} from './fluentAsyncFunctions';
import {
  AsyncPredicate,
  Comparer,
  Mapper,
  Predicate,
  FluentAsyncIterable,
} from './types';
import { fluentGroup, identity, truth } from './utils';
import { ErrorCallback } from './mergeIterators';

/**
 * Tranforms an asynchronous iterable into a [[FluentAsyncIterable]].
 * @typeparam T The type of the items in the async iterable.
 * @param iterable The asynchronous iterable instance.
 * @returns The [[FluentAsyncIterable]] instance.
 */
function fluentAsync<T>(iterable: AsyncIterable<T>): FluentAsyncIterable<T> {
  return {
    withIndex: () => fluentAsync(withIndex(iterable)),
    takeWhile: (predicate) => fluentAsync(takeWhile(iterable, predicate)),
    takeWhileAsync: (predicate) =>
      fluentAsync(takeWhileAsync(iterable, predicate)),
    take: (n) => fluentAsync(take(iterable, n)),
    skipWhile: (predicate) => fluentAsync(skipWhile(iterable, predicate)),
    skipWhileAsync: (predicate) =>
      fluentAsync(skipWhileAsync(iterable, predicate)),
    skip: (n) => fluentAsync(skip(iterable, n)),
    map: (mapper) => fluentAsync(map(iterable, mapper)),
    mapAsync: (mapper) => fluentAsync(mapAsync(iterable, mapper)),
    filter: (predicate) => fluentAsync(filter(iterable, predicate)),
    filterAsync: (predicate) => fluentAsync(filterAsync(iterable, predicate)),
    partition: (size) =>
      fluentAsync(partition(iterable, size)).map((part) => fluentAsync(part)),
    append: (item) => fluentAsync(append(iterable, item)),
    prepend: (item) => fluentAsync(prepend(iterable, item)),
    concat: (...iterables) => fluentAsync(concat(iterable, ...iterables)),
    repeat: (n) => fluentAsync(repeat(iterable, n)),
    flatten: <R>(
      mapper: Mapper<T, Iterable<R>> = identity as Mapper<T, Iterable<R>>,
    ) => fluentAsync(flatten(iterable, mapper)),
    flattenAsync: (mapper) => fluentAsync(flattenAsync(iterable, mapper)),
    sort: (comparer?) => fluentAsync(sort(iterable, comparer)),
    distinct: <R>(mapper: Mapper<T, R> = identity as Mapper<T, R>) =>
      fluentAsync(distinct(iterable, mapper)),
    distinctAsync: (mapper) => fluentAsync(distinctAsync(iterable, mapper)),
    group: <R>(mapper: Mapper<T, R>) =>
      fluentAsync(group(iterable, mapper)).map(fluentGroup),
    groupAsync: (mapper) =>
      fluentAsync(groupAsync(iterable, mapper)).map(fluentGroup),
    count: (predicate: Predicate<T> = truth) => count(iterable, predicate),
    countAsync: (predicate: AsyncPredicate<T>) =>
      countAsync(iterable, predicate),
    first: (predicate = truth) => first(iterable, predicate),
    firstAsync: (predicate) => firstAsync(iterable, predicate),
    last: (predicate = truth) => last(iterable, predicate),
    lastAsync: (predicate) => lastAsync(iterable, predicate),
    reduceAndMap: (reducer, initial, result) =>
      reduceAndMap(iterable, reducer, initial, result),
    reduceAndMapAsync: (reducer, initial, result) =>
      reduceAndMapAsync(iterable, reducer, initial, result),
    reduce: (reducer, initial) => reduce(iterable, reducer, initial),
    reduceAsync: (reducer, initial) => reduceAsync(iterable, reducer, initial),
    all: (predicate) => all(iterable, predicate),
    allAsync: (predicate) => allAsync(iterable, predicate),
    any: (predicate = truth) => any(iterable, predicate),
    anyAsync: (predicate) => anyAsync(iterable, predicate),
    contains: (item) => contains(iterable, item),
    toArray: () => toArray(iterable),
    toObject: (keySelector, valueSelector = identity) =>
      toObject(iterable, keySelector, valueSelector),
    toObjectAsync: (keySelector, valueSelector) =>
      toObjectAsync(iterable, keySelector, valueSelector),
    forEach: (action) => forEach(iterable, action),
    forEachAsync: (action) => forEachAsync(iterable, action),
    execute: (action) => fluentAsync(execute(iterable, action)),
    executeAsync: (action) => fluentAsync(executeAsync(iterable, action)),
    join: (
      separator,
      mapper: Mapper<T, string> = identity as Mapper<T, string>,
    ) => join(iterable, separator, mapper),
    joinAsync: (separator, mapper) => joinAsync(iterable, separator, mapper),
    sum: (mapper: Mapper<T, number> = identity as Mapper<T, number>) =>
      sum(iterable, mapper),
    sumAsync: (mapper) => sumAsync(iterable, mapper),
    avg: (mapper: Mapper<T, number> = identity as Mapper<T, number>) =>
      avg(iterable, mapper),
    avgAsync: (mapper) => avgAsync(iterable, mapper),
    top: <R>(mapper: Mapper<T, R>, comparer: Comparer<R>) =>
      top(iterable, mapper, comparer),
    topAsync: (mapper, comparer) => topAsync(iterable, mapper, comparer),
    min: (mapper: Mapper<T, number> = identity as Mapper<T, number>) =>
      min(iterable, mapper),
    minAsync: (mapper) => minAsync(iterable, mapper),
    max: (mapper: Mapper<T, number> = identity as Mapper<T, number>) =>
      max(iterable, mapper),
    maxAsync: (mapper) => maxAsync(iterable, mapper),
    hasExactly: (expectedNumber) => hasExactly(iterable, expectedNumber),
    hasLessThan: (threshold) => hasLessThan(iterable, threshold),
    hasMoreThan: (threshold) => hasMoreThan(iterable, threshold),
    merge: <R>(...iterables: AsyncIterable<R>[]) =>
      fluentAsync(merge<T | R>(iterable, ...iterables)),
    mergeCatching: <R>(
      errorCallback: ErrorCallback,
      ...iterables: AsyncIterable<R>[]
    ) =>
      fluentAsync(mergeCatching<T | R>(errorCallback, iterable, ...iterables)),
    [Symbol.asyncIterator]: () => iterable[Symbol.asyncIterator](),
  };
}

export default fluentAsync;
