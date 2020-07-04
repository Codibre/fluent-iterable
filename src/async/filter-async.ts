import { AsyncPredicate } from '../types';
import { AnyIterable } from '../common/any-iterable';

export async function* filterAsync<T>(
  iterable: AnyIterable<T>,
  predicate: AsyncPredicate<T>,
): AsyncIterable<T> {
  for await (const t of iterable) {
    if (await predicate(t)) {
      yield t;
    }
  }
}
