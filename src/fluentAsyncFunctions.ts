import { Comparer, Mapper, Predicate, Reducer, Indexed } from './types';
import { identity, truth } from './utils';
import {
  anyAsync,
  merge,
  mergeCatching,
  forEachAsync,
  groupAsync,
  takeWhileAsync,
  distinctAsync,
  executeAsync,
  filterAsync,
  firstAsync,
  flattenAsync,
  mapAsync,
  skipWhileAsync,
  toObjectAsync,
  allAsync,
  reduceAndMapAsync,
  lastAsync,
} from './async';
import { getTop } from './common/get-top';
import { getMin, getMax } from './common';
import {} from './async/first-async';
import { countAsync } from './async/count-async';
import { reduceAsync } from './async/reduce-async';

async function toArray<T>(iterable: AsyncIterable<T>): Promise<T[]> {
  const array: T[] = [];
  for await (const t of iterable) {
    array.push(t);
  }

  return array;
}

async function* withIndex<T>(
  iterable: AsyncIterable<T>,
): AsyncIterable<Indexed<T>> {
  let idx = 0;
  for await (const t of iterable) {
    yield { idx: idx++, value: t };
  }
}

function take<T>(iterable: AsyncIterable<T>, n: number): AsyncIterable<T> {
  let counter = 0;
  return takeWhileAsync(iterable, () => counter++ < n);
}

function skip<T>(iterable: AsyncIterable<T>, n: number): AsyncIterable<T> {
  let counter = n;
  return skipWhileAsync(iterable, () => counter-- > 0);
}

async function* append<T>(
  iterable: AsyncIterable<T>,
  item: T,
): AsyncIterable<T> {
  yield* iterable;
  yield item;
}

async function* prepend<T>(
  iterable: AsyncIterable<T>,
  item: T,
): AsyncIterable<T> {
  yield item;
  yield* iterable;
}

async function* concat<T>(
  ...iterables: Array<AsyncIterable<T>>
): AsyncIterable<T> {
  for (const iterable of iterables) {
    yield* iterable;
  }
}

async function* repeat<T>(
  iterable: AsyncIterable<T>,
  n: number,
): AsyncIterable<T> {
  if (n < 1) {
    return;
  }

  const cache: T[] = [];

  for await (const t of iterable) {
    yield t;
    cache.push(t);
  }

  for (let i = 1; i < n; ++i) {
    yield* cache;
  }
}

async function* sort<T>(
  iterable: AsyncIterable<T>,
  comparer?: Comparer<T>,
): AsyncIterable<T> {
  yield* (await toArray(iterable)).sort(comparer);
}

async function* readPartition<T>(
  iterator: AsyncIterator<T>,
  next: IteratorResult<T>,
  size: number,
): AsyncIterable<T> {
  for (; size > 0; --size) {
    if (next.done) {
      break;
    }

    yield next.value;

    if (size > 1) {
      next = await iterator.next();
    }
  }
}

async function* partition<T>(
  iterable: AsyncIterable<T>,
  size: number,
): AsyncIterable<AsyncIterable<T>> {
  if (size < 1) {
    throw new Error(
      `Validation failed, size (${size}) expected to be bigger than 0`,
    );
  }

  const iterator = iterable[Symbol.asyncIterator]();
  for (
    let next = await iterator.next();
    !next.done;
    next = await iterator.next()
  ) {
    yield readPartition(iterator, next, size);
  }
}

function contains<T>(iterable: AsyncIterable<T>, item: T): Promise<boolean> {
  return anyAsync(iterable, (next) => next === item);
}

async function join<T>(
  iterable: AsyncIterable<T>,
  separator: string,
  mapper: Mapper<T, string> = identity as Mapper<T, string>,
): Promise<string> {
  return (
    (await reduceAsync<T, string | undefined>(
      iterable,
      (current, next) => {
        const nextStr = mapper(next);
        return current ? `${current}${separator}${nextStr}` : nextStr;
      },
      undefined,
    )) || ''
  );
}

function sum<T>(
  iterable: AsyncIterable<T>,
  mapper: Mapper<T, number> = identity as Mapper<T, number>,
): Promise<number> {
  return reduceAsync(iterable, (current, next) => current + mapper(next), 0);
}

function avg<T>(
  iterable: AsyncIterable<T>,
  mapper: Mapper<T, number> = identity as Mapper<T, number>,
): Promise<number> {
  return reduceAndMapAsync(
    iterable,
    (current, next) => ({
      avg: (current.avg * current.count + mapper(next)) / (current.count + 1),
      count: current.count + 1,
    }),
    { avg: 0, count: 0 },
    (acc) => acc.avg,
  );
}

const top: <T, R>(
  iterable: AsyncIterable<T>,
  mapper: Mapper<T, R>,
  comparer: Comparer<R>,
) => Promise<T | undefined> = getTop(reduceAndMapAsync);

const min: <T>(
  iterable: AsyncIterable<T>,
  mapper?: Mapper<T, number>,
) => Promise<T | undefined> = getMin(top);

const max: <T>(
  iterable: AsyncIterable<T>,
  mapper?: Mapper<T, number>,
) => Promise<T | undefined> = getMax(top);

async function hasExactly<T>(
  iterable: AsyncIterable<T>,
  expectedSize: number,
): Promise<boolean> {
  return (await countAsync(take(iterable, expectedSize + 1))) === expectedSize;
}

async function hasLessThan<T>(
  iterable: AsyncIterable<T>,
  threshold: number,
): Promise<boolean> {
  return (await countAsync(take(iterable, threshold + 1))) < threshold;
}

async function hasMoreThan<T>(
  iterable: AsyncIterable<T>,
  threshold: number,
): Promise<boolean> {
  return (await countAsync(take(iterable, threshold + 1))) > threshold;
}

export const asyncHelper = {
  withIndex,
  takeWhile: takeWhileAsync,
  take,
  skipWhile: skipWhileAsync,
  skip,
  map: mapAsync,
  filter: filterAsync,
  partition,
  append,
  prepend,
  concat,
  repeat,
  flatten: flattenAsync,
  sort,
  distinct: distinctAsync,
  count: countAsync,
  first: firstAsync,
  last: lastAsync,
  reduceAndMap: reduceAndMapAsync,
  reduce: reduceAsync,
  all: allAsync,
  any: anyAsync,
  contains,
  toArray,
  toObject: toObjectAsync,
  forEach: forEachAsync,
  execute: executeAsync,
  join,
  sum,
  avg,
  top,
  min,
  max,
  hasExactly,
  hasLessThan,
  hasMoreThan,
  merge,
};

export const asyncIterableFuncs = {
  withIndex,
  takeWhile: takeWhileAsync,
  takeWhileAsync,
  take,
  skipWhile: skipWhileAsync,
  skipWhileAsync,
  skip,
  map: mapAsync,
  mapAsync,
  filter: filterAsync,
  filterAsync,
  append,
  prepend,
  concat,
  repeat,
  flatten: flattenAsync,
  flattenAsync,
  sort,
  distinct: distinctAsync,
  distinctAsync,
  group: groupAsync,
  groupAsync,
  execute: executeAsync,
  executeAsync,
  merge,
  mergeCatching,
};

export const asyncSpecial = {
  partition,
  group: groupAsync,
  groupAsync,
};

export const asyncResolvingFuncs = {
  count: countAsync,
  countAsync,
  first: firstAsync,
  firstAsync,
  last: lastAsync,
  lastAsync,
  reduceAndMap: reduceAndMapAsync,
  reduceAndMapAsync,
  reduce: reduceAsync,
  reduceAsync,
  all: allAsync,
  allAsync,
  any: anyAsync,
  anyAsync,
  contains,
  toArray,
  toObject: toObjectAsync,
  toObjectAsync,
  forEach: forEachAsync,
  forEachAsync,
  join,
  joinAsync: join,
  sum,
  sumAsync: sum,
  avg,
  avgAsync: avg,
  top,
  topAsync: top,
  min,
  minAsync: min,
  max,
  maxAsync: max,
  hasExactly,
  hasLessThan,
  hasMoreThan,
};
