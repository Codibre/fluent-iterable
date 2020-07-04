import { AsyncReducer, AsyncMapper } from '../types';
import { AnyIterable } from '../common/any-iterable';

export async function reduceAndMapAsync<T, A, R>(
  iterable: AnyIterable<T>,
  reducer: AsyncReducer<T, A>,
  initial: A,
  result: AsyncMapper<A, R>,
): Promise<R> {
  let accumulator: A = initial;
  for await (const t of iterable) {
    accumulator = await reducer(accumulator, t);
  }

  return result(accumulator);
}
