import { BinaryComparer, resolver } from '../utils';
import { getComparison } from '../common';
import { count } from './count';
import { take } from './take';

export function getSyncComparer(comparer: BinaryComparer) {
  return getComparison(count, take, resolver, comparer);
}
