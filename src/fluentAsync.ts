import {
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
  forEach,
  forEachAsync,
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
} from './fluentAsyncFunctions';
import {
  Action,
  AsyncAction,
  AsyncMapper,
  AsyncPredicate,
  AsyncReducer,
  Comparer,
  Group,
  Mapper,
  Predicate,
  Reducer,
} from './types';
import { identity, truth } from './utils';

interface FluentAsyncIterable<T> extends AsyncIterable<T> {
  takeWhile(condition: Predicate<T>): FluentAsyncIterable<T>;
  takeWhileAsync(condition: AsyncPredicate<T>): FluentAsyncIterable<T>;
  take(n: number): FluentAsyncIterable<T>;
  skipWhile(condition: Predicate<T>): FluentAsyncIterable<T>;
  skipWhileAsync(condition: AsyncPredicate<T>): FluentAsyncIterable<T>;
  skip(n: number): FluentAsyncIterable<T>;
  map<R>(mapper: Mapper<T, R>): FluentAsyncIterable<R>;
  mapAsync<R>(mapper: AsyncMapper<T, R>): FluentAsyncIterable<R>;
  filter(predicate: Predicate<T>): FluentAsyncIterable<T>;
  filterAsync(predicate: AsyncPredicate<T>): FluentAsyncIterable<T>;
  append(item: T): FluentAsyncIterable<T>;
  prepend(item: T): FluentAsyncIterable<T>;
  concat(...iterables: Array<AsyncIterable<T>>): FluentAsyncIterable<T>;
  repeat(n: number): FluentAsyncIterable<T>;
  flatten<R>(mapper?: Mapper<T, Iterable<R>>): FluentAsyncIterable<R>;
  flattenAsync<R>(mapper: AsyncMapper<T, AsyncIterable<R>>): FluentAsyncIterable<R>;
  sort(comparer?: Comparer<T>): FluentAsyncIterable<T>;
  distinct<R>(mapper?: Mapper<T, R>): FluentAsyncIterable<T>;
  distinctAsync<R>(mapper: AsyncMapper<T, R>): FluentAsyncIterable<T>;
  group<R>(mapper: Mapper<T, R>): FluentAsyncIterable<Group<T, R>>;
  groupAsync<R>(mapper: AsyncMapper<T, R>): FluentAsyncIterable<Group<T, R>>;
  count(predicate?: Predicate<T>): Promise<number>;
  countAsync(predicate: AsyncPredicate<T>): Promise<number>;
  first(predicate?: Predicate<T>): Promise<T | undefined>;
  firstAsync(predicate: AsyncPredicate<T>): Promise<T | undefined>;
  last(predicate?: Predicate<T>): Promise<T | undefined>;
  lastAsync(predicate: AsyncPredicate<T>): Promise<T | undefined>;
  reduceAndMap<A, R>(reducer: Reducer<T, A>, initial: A, result: Mapper<A, R>): Promise<R>;
  reduceAndMapAsync<A, R>(reducer: AsyncReducer<T, A>, initial: A, result: AsyncMapper<A, R>): Promise<R>;
  reduce<R>(reducer: Reducer<T, R>, initial: R): Promise<R>;
  reduceAsync<R>(reducer: AsyncReducer<T, R>, initial: R): Promise<R>;
  all(predicate: Predicate<T>): Promise<boolean>;
  allAsync(predicate: AsyncPredicate<T>): Promise<boolean>;
  any(predicate?: Predicate<T>): Promise<boolean>;
  anyAsync(predicate: AsyncPredicate<T>): Promise<boolean>;
  contains(item: T): Promise<boolean>;
  toArray(): Promise<T[]>;
  forEach(action: Action<T>): void;
  forEachAsync(action: AsyncAction<T>): Promise<void>;
  sum(mapper?: Mapper<T, number>): Promise<number>;
  sumAsync(mapper: AsyncMapper<T, number>): Promise<number>;
  avg(mapper?: Mapper<T, number>): Promise<number>;
  avgAsync(mapper: AsyncMapper<T, number>): Promise<number>;
  top<R>(mapper: Mapper<T, R>, comparer: Comparer<R>): Promise<T | undefined>;
  topAsync<R>(mapper: AsyncMapper<T, R>, comparer: Comparer<R>): Promise<T | undefined>;
  min(mapper?: Mapper<T, number>): Promise<T | undefined>;
  minAsync(mapper: AsyncMapper<T, number>): Promise<T | undefined>;
  max(mapper?: Mapper<T, number>): Promise<T | undefined>;
  maxAsync(mapper: AsyncMapper<T, number>): Promise<T | undefined>;
}

function fluentAsync<T>(iterable: AsyncIterable<T>): FluentAsyncIterable<T> {
  return {
    takeWhile: predicate => fluentAsync(takeWhile(iterable, predicate)),
    takeWhileAsync: predicate => fluentAsync(takeWhileAsync(iterable, predicate)),
    take: n => fluentAsync(take(iterable, n)),
    skipWhile: predicate => fluentAsync(skipWhile(iterable, predicate)),
    skipWhileAsync: predicate => fluentAsync(skipWhileAsync(iterable, predicate)),
    skip: n => fluentAsync(skip(iterable, n)),
    map: mapper => fluentAsync(map(iterable, mapper)),
    mapAsync: mapper => fluentAsync(mapAsync(iterable, mapper)),
    filter: predicate => fluentAsync(filter(iterable, predicate)),
    filterAsync: predicate => fluentAsync(filterAsync(iterable, predicate)),
    append: item => fluentAsync(append(iterable, item)),
    prepend: item => fluentAsync(prepend(iterable, item)),
    concat: (...iterables) => fluentAsync(concat(iterable, ...iterables)),
    repeat: n => fluentAsync(repeat(iterable, n)),
    flatten: <R>(mapper: Mapper<T, Iterable<R>> = identity as Mapper<T, Iterable<R>>) =>
      fluentAsync(flatten(iterable, mapper)),
    flattenAsync: mapper => fluentAsync(flattenAsync(iterable, mapper)),
    sort: (comparer?) => fluentAsync(sort(iterable, comparer)),
    distinct: <R>(mapper: Mapper<T, R> = identity as Mapper<T, R>) => fluentAsync(distinct(iterable, mapper)),
    distinctAsync: mapper => fluentAsync(distinctAsync(iterable, mapper)),
    group: <R>(mapper: Mapper<T, R>) => fluentAsync(group(iterable, mapper)),
    groupAsync: mapper => fluentAsync(groupAsync(iterable, mapper)),
    count: (predicate: Predicate<T> = truth) => count(iterable, predicate),
    countAsync: (predicate: AsyncPredicate<T>) => countAsync(iterable, predicate),
    first: (predicate = truth) => first(iterable, predicate),
    firstAsync: predicate => firstAsync(iterable, predicate),
    last: (predicate = truth) => last(iterable, predicate),
    lastAsync: predicate => lastAsync(iterable, predicate),
    reduceAndMap: (reducer, initial, result) => reduceAndMap(iterable, reducer, initial, result),
    reduceAndMapAsync: (reducer, initial, result) => reduceAndMapAsync(iterable, reducer, initial, result),
    reduce: (reducer, initial) => reduce(iterable, reducer, initial),
    reduceAsync: (reducer, initial) => reduceAsync(iterable, reducer, initial),
    all: predicate => all(iterable, predicate),
    allAsync: predicate => allAsync(iterable, predicate),
    any: (predicate = truth) => any(iterable, predicate),
    anyAsync: predicate => anyAsync(iterable, predicate),
    contains: item => contains(iterable, item),
    toArray: () => toArray(iterable),
    forEach: action => forEach(iterable, action),
    forEachAsync: action => forEachAsync(iterable, action),
    sum: (mapper: Mapper<T, number> = identity as Mapper<T, number>) => sum(iterable, mapper),
    sumAsync: mapper => sumAsync(iterable, mapper),
    avg: (mapper: Mapper<T, number> = identity as Mapper<T, number>) => avg(iterable, mapper),
    avgAsync: mapper => avgAsync(iterable, mapper),
    top: <R>(mapper: Mapper<T, R>, comparer: Comparer<R>) => top(iterable, mapper, comparer),
    topAsync: (mapper, comparer) => topAsync(iterable, mapper, comparer),
    min: (mapper: Mapper<T, number> = identity as Mapper<T, number>) => min(iterable, mapper),
    minAsync: mapper => minAsync(iterable, mapper),
    max: (mapper: Mapper<T, number> = identity as Mapper<T, number>) => max(iterable, mapper),
    maxAsync: mapper => maxAsync(iterable, mapper),
    [Symbol.asyncIterator]: () => iterable[Symbol.asyncIterator](),
  };
}

export default fluentAsync;
export { FluentAsyncIterable };
