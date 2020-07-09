import { identity } from '../utils';
import { AnyIterable } from '../types-internal';

export function caseCheckAsyncRecipe(
  ifTrue: Function,
  ifFalse: unknown,
  defaultPredicate?: Function,
  predicateTransform: Function = identity,
) {
  return async <T>(
    iterable: AnyIterable<T>,
    givenPredicate: Function = defaultPredicate as any,
  ) => {
    const predicate = predicateTransform(givenPredicate);
    for await (const t of iterable) {
      if (await predicate(t)) {
        return ifTrue(t);
      }
    }

    return ifFalse;
  };
}