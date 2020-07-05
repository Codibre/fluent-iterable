import { identity } from '../utils';

export function caseCheckRecipe(
  ifTrue: Function,
  ifFalse: unknown,
  defaultPredicate?: Function,
  predicateTransform: Function = identity,
) {
  return <T>(
    iterable: Iterable<T>,
    givenPredicate: Function = defaultPredicate as any,
  ) => {
    const predicate = predicateTransform(givenPredicate);
    for (const t of iterable) {
      if (predicate(t)) {
        return ifTrue(t);
      }
    }

    return ifFalse;
  };
}
