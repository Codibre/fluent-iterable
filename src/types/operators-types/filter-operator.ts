import { AnyIterable, AsyncPredicate, Predicate } from 'augmentative-iterable';
import { Truthy } from '../truthy';

type RequiresTruthy<T, Guarantees extends keyof T> = T &
  {
    [P in Guarantees]-?: Truthy<T[P]>;
  };

export interface FilterFunction {
  /**
   * Filters the falsy values of a iterable of `T`<br>
   *   Example: `fluent(['anchor', undefined, 'bound', undefined]).filter()` yields *anchor* and *bound*.
   * @returns A [[FluentIterable]] of the elements against which the predicate evaluates to `true`.
   */
  <T>(): (it: Iterable<T>) => Iterable<Truthy<T>>;
  /**
   * Filters the iterable of `T` based on a predicate.<br>
   *   Example: `fluent(['anchor', 'almond', 'bound', 'alpine']).filter(word => word[0] === 'a')` yields *anchor*, *almond*, and *alpine*.
   * @param predicate A predicate of `T`. All elements are yielded from the iterable against which this evaluates to `true`.
   * @returns A [[FluentIterable]] of the elements against which the predicate evaluates to `true`.
   */
  <Guarantees extends keyof T = any, T = any>(predicate: Predicate<T>): (
    it: Iterable<T>,
  ) => Iterable<RequiresTruthy<T, Guarantees>>;
  /**
   * Filters the iterable of `T` based on a predicate.<br>
   *   Example: `fluent(['anchor', 'almond', 'bound', 'alpine']).filter(word => word[0] === 'a')` yields *anchor*, *almond*, and *alpine*.
   * @param predicate A predicate of `T`. All elements are yielded from the iterable against which this evaluates to `true`.
   * @returns A [[FluentIterable]] of the elements against which the predicate evaluates to `true`.
   */
  <K extends keyof T, T>(predicate: K): (
    it: Iterable<T>,
  ) => Iterable<RequiresTruthy<T, K>>;
}
export interface AsyncFilterFunction {
  /**
   * Filters the falsy values of a iterable of `T`<br>
   *   Example: `fluentAsync(['anchor', undefined, 'bound', undefined]).filter()` yields *anchor* and *bound*.
   * @returns A [[FluentAsyncIterable]] of the elements against which the predicate evaluates to `true`.
   */
  <T>(): (it: AnyIterable<T>) => AsyncIterable<Truthy<T>>;
  /**
   * Filters the iterable of `T` based on an asynchronous predicate.
   * @param predicate An asynchronous predicate of `T`. All elements are yielded from the iterable against which this evaluates to `true`.
   * @returns A [[FluentAsyncIterable]] of the elements against which the predicate evaluates to `true`.
   */
  <Guarantees extends keyof T = any, T = any>(predicate: AsyncPredicate<T>): (
    it: AnyIterable<T>,
  ) => AsyncIterable<RequiresTruthy<T, Guarantees>>;
  /**
   * Filters the iterable of `T` based on an asynchronous predicate.
   * @param predicate An asynchronous predicate of `T`. All elements are yielded from the iterable against which this evaluates to `true`.
   * @returns A [[FluentAsyncIterable]] of the elements against which the predicate evaluates to `true`.
   */
  <R extends keyof T, K extends keyof T, T>(predicate: R): (
    it: AnyIterable<T>,
  ) => AsyncIterable<RequiresTruthy<T, K>>;
}