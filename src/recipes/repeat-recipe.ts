import { AnyIterable } from 'augmentative-iterable';
import { ConcatIngredient, EmptyIngredient, Ingredient } from './ingredients';

function* repeat<T>(times: number, cache: T[]) {
  for (let i = 1; i < times; ++i) {
    yield* cache;
  }
}

export function repeatRecipe(
  map: Ingredient,
  concat: ConcatIngredient,
  empty: EmptyIngredient,
) {
  return function <T>(this: AnyIterable<T>, n: number): any {
    if (n >= 1) {
      const cache: T[] = [];
      return concat.call(
        map.call(this, (value: T) => {
          cache.push(value);
          return value;
        }),
        repeat(n, cache),
      );
    }

    return empty();
  };
}
