import { AsyncMapper } from '../types';
import { AnyIterable } from '../common/any-iterable';
import { getMax } from '../common';
import { topAsync } from './top-async';

export const maxAsync: <T>(
  iterable: AnyIterable<T>,
  mapper?: AsyncMapper<T, number>,
) => Promise<T | undefined> = getMax(topAsync);
