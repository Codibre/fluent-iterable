import { AnyIterable } from '../common/any-iterable';

export function getExecute(
  map: Function,
  getMapping: (action: Function) => <T>(t: T) => any,
) {
  return <T>(iterable: AnyIterable<T>, action: Function) =>
    map(iterable, getMapping(action));
}
