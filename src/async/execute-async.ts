import { getExecute } from '../recipes/get-execute';
import { mapAsync } from './map-async';

export const executeAsync = getExecute(mapAsync, (action) => async (t) => {
  await action(t);
  return t;
});
