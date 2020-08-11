import { identity } from '../utils';
import { AnyIterable } from 'augmentative-iterable';
import { AsyncReducer } from '../types-base';

export function reduceRecipe(reduceAndMap: Function) {
  return function <T, R>(
    this: AnyIterable<T>,
    reducer: AsyncReducer<T, R>,
    initial: R,
  ) {
    return reduceAndMap.call(this, reducer, initial, identity);
  };
}
