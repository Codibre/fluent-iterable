import { AsyncMapper } from '../types';
import { mapAsync } from './map-async';
import { getFlatten } from '../common/get-flatten';
import { asyncIterateAll } from '../utils';

export const flattenAsync = getFlatten(asyncIterateAll, mapAsync);
