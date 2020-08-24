/* eslint-disable guard-for-in */
/* eslint-disable @typescript-eslint/no-empty-function */
import fluent from './fluent';
import { AsyncPredicate, FluentGroup } from './types';
import { Group, Predicate, AverageStepper } from './types-base';
import { AnyIterable } from 'augmentative-iterable';
import { orderAssured } from './types-internal';

/**
 * Returns exactly the informed parameter
 * @param param The informed parameter to be returned
 */
function identity<T>(param: T): T {
  return param;
}

/**
 * @internal
 */
async function* promiseIterateAsync<T>(
  a: PromiseLike<AnyIterable<T>>,
): AsyncIterable<T> {
  yield* await a;
}

/**
 * Iterates all element of an async iterable
 * @typeparam T the item type of the [[Iterable]]
 * @param a The async iterable
 */
function iterateAsync<T>(
  a: AnyIterable<T> | PromiseLike<AnyIterable<T>>,
): AsyncIterable<T> {
  return ((a as any).then || (a as any)[Symbol.iterator]
    ? promiseIterateAsync(a as any)
    : a) as any;
}

/**
 * Iterates in all elements of an async iterable of iterables or async iterables
 * @typeparam T the item type of the internal [[Iterable/AsyncIterable]]
 * @param a The async iterable
 */
async function* iterateAllAsync<T>(a: AsyncIterable<AnyIterable<T>>) {
  for await (const it of a) {
    yield* it;
  }
}

/**
 * Iterates all element of an iterable
 * @typeparam T the item type of the [[Iterable]]
 * @param a The iterable
 */
const iterate = identity;

/**
 * Returns a function that always returns the informed value
 * @param value the constant value
 */
function constant<T>(value: T) {
  return function constantValue() {
    return value;
  };
}

/**
 * Iterates in all elements of an iterable of iterables
 * @typeparam T the item type of the internal [[Iterable]]
 * @param a The iterable
 */
function* iterateAll<T>(a: Iterable<Iterable<T>>) {
  for (const it of a) {
    yield* it;
  }
}

/**
 * Iterates over all owned properties of the given object
 * @param obj The object to iterate with
 */
function* iterateObjProps<T extends object>(obj: T): Iterable<keyof T> {
  for (const property in obj) {
    yield property;
  }
}

/**
 * Iterates over all owned entries of given object
 * @param obj The object to iterate with
 */
function* iterateObjEntries<T extends object>(obj: T) {
  for (const property of iterateObjProps(obj)) {
    yield [property, obj[property]];
  }
}

/**
 * Provides a "equals" comparer
 * @typeparam T the type of b
 * @param b the value for comparison
 */
function eq<T>(b: any) {
  return (a: T) => a === b;
}

/**
 * Provides a "greater than" comparer
 * @typeparam T the type of b
 * @param b the value for comparison
 */
function gt<T>(b: any) {
  return (a: T) => a > b;
}

/**
 * Provides a "greater or equal" comparer
 * @typeparam T the type of b
 * @param b the value for comparison
 */
function ge<T>(b: any) {
  return (a: T) => a >= b;
}

/**
 * Provides a "lesser than" comparer
 * @typeparam T the type of b
 * @param b the value for comparison
 */
function lt<T>(b: any) {
  return (a: T) => a < b;
}

/**
 * Provides a "lesser or equal" comparer
 * @typeparam T the type of b
 * @param b the value for comparison
 */
function le<T>(b: any) {
  return (a: T) => a <= b;
}

/**
 * Provides an empty iterable
 */
function* empty(): Iterable<undefined> {}

/**
 * Provides an empty async iterable
 */
async function* emptyAsync(): AsyncIterable<undefined> {}

/**
 * Always returns true
 */
function truth(): boolean {
  return true;
}

/**
 * Always returns false
 */
function falsity(): boolean {
  return false;
}

/**
 * Provides a function that negates the informed predicate
 * @typeparam T the item type of the [[Predicate]]
 * @param predicate The predicate to be negated
 */
function negation<T>(predicate: Predicate<T>): Predicate<T> {
  return (item: T) => !predicate(item);
}

/**
 * Provides a function that negates the informed async predicate
 * @typeparam T the item type of the [[AsyncPredicate]]
 * @param predicate The async predicate to be negated
 */
function asyncNegation<T>(predicate: AsyncPredicate<T>): AsyncPredicate<T> {
  return async (item: T) => !(await predicate(item));
}

/**
 * Convert a simple [[Group]] to a [[FluentGroup]]
 * @typeparam Key The type of the key
 * @typeparam Value the type of the items of the value property
 * @param {Group} grp the [[Group]] to be converted
 */
function fluentGroup<Key, Value>(
  grp: Group<Value, Key>,
): FluentGroup<Value, Key> {
  return {
    ...grp,
    values: fluent(grp.values),
  };
}

/**
 * Returns an object to calculates incremental average/iterative means
 */
function getAverageStepper() {
  let avg = 0;
  let count = 0;
  const wrapper: AverageStepper = {
    get avg() {
      return count ? avg : NaN;
    },
    step: (y: number) => (avg = avg + (y - avg) / ++count),
  };

  return wrapper;
}

/**
 * Returns a new instance of a function with a order assuring mark.
 * Fluent Iterable will treat order Assuring marked function as if
 * they're guaranteed to return ordered result in regard some iterable
 * where they're applied. The actual order, though, is of responsibility
 * of the code using this package.
 *
 * This is useful to have access to faster versions of some algorithms, but
 * the output may not match expectation if the resulting order is not actually right.
 *
 * All operations order assuring ready will have this specified in their documentation
 * @param f the function to assure order
 */
function assureOrder<F extends Function>(f: F): F {
  const result = (...args: any[]) => f(...args);
  (result as any)[orderAssured] = true;
  return result as any;
}

export {
  assureOrder,
  constant,
  empty,
  emptyAsync,
  identity,
  truth,
  falsity,
  negation,
  asyncNegation,
  fluentGroup,
  getAverageStepper,
  eq,
  ge,
  gt,
  le,
  lt,
  iterateAsync,
  iterateAllAsync,
  iterate,
  iterateAll,
  iterateObjProps,
  iterateObjEntries,
};
