import fluentAsync from './fluentAsync';
import { fluentGroup, identity, truth } from './utils';
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
  filterAsync,
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
  toAsync,
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
} from './fluentFunctions';
import { Comparer, Mapper, FluentIterable } from './types';

/**
 * Tranforms an iterable into a [[FluentIterable]].
 * @typeparam T The type of the items in the iterable.
 * @param iterable The iterable instance.
 * @returns The [[FluentIterable]] instance.
 */
function fluent<T>(iterable: Iterable<T>): FluentIterable<T> {
  return {
    withIndex: () => fluent(withIndex(iterable)),
    takeWhile: (predicate) => fluent(takeWhile(iterable, predicate)),
    takeWhileAsync: (predicate) =>
      fluentAsync(takeWhileAsync(iterable, predicate)),
    take: (n) => fluent(take(iterable, n)),
    skipWhile: (predicate) => fluent(skipWhile(iterable, predicate)),
    skipWhileAsync: (predicate) =>
      fluentAsync(skipWhileAsync(iterable, predicate)),
    skip: (n) => fluent(skip(iterable, n)),
    map: (mapper) => fluent(map(iterable, mapper)),
    mapAsync: (mapper) => fluentAsync(mapAsync(iterable, mapper)),
    filter: (predicate) => fluent(filter(iterable, predicate)),
    filterAsync: (predicate) => fluentAsync(filterAsync(iterable, predicate)),
    partition: (size) =>
      fluent(partition(iterable, size)).map((part) => fluent(part)),
    append: (item) => fluent(append(iterable, item)),
    prepend: (item) => fluent(prepend(iterable, item)),
    concat: (...iterables) => fluent(concat(iterable, ...iterables)),
    repeat: (n) => fluent(repeat(iterable, n)),
    flatten: <R>(
      mapper: Mapper<T, Iterable<R>> = identity as Mapper<T, Iterable<R>>,
    ) => fluent(flatten(iterable, mapper)),
    flattenAsync: (mapper) => fluentAsync(flattenAsync(iterable, mapper)),
    sort: (comparer?) => fluent(sort(iterable, comparer)),
    distinct: <R>(mapper: Mapper<T, R> = identity as Mapper<T, R>) =>
      fluent(distinct(iterable, mapper)),
    distinctAsync: (mapper) => fluentAsync(distinctAsync(iterable, mapper)),
    group: <R>(mapper: Mapper<T, R>) =>
      fluent(group(iterable, mapper)).map(fluentGroup),
    groupAsync: (mapper) =>
      fluentAsync(groupAsync(iterable, mapper)).map(fluentGroup),
    count: (predicate = truth) => count(iterable, predicate),
    countAsync: (predicate) => countAsync(iterable, predicate),
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
    toAsync: () => fluentAsync(toAsync(iterable)),
    forEach: (action) => forEach(iterable, action),
    forEachAsync: (action) => forEachAsync(iterable, action),
    execute: (action) => fluent(execute(iterable, action)),
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
    [Symbol.iterator]: () => iterable[Symbol.iterator](),
  };
}

export default fluent;
