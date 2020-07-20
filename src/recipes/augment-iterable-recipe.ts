import { AnyIterable, AugmentType } from '../types-internal';
import { AsyncAction } from '../types';

export function augmentIterableRecipe(
  augmentIterableAsync: Function,
  type: AugmentType,
) {
  return function <T>(
    this: AnyIterable<T>,
    action: AsyncAction<T>,
  ): AsyncIterable<T> {
    return augmentIterableAsync(this, {
      type,
      action,
    });
  };
}
