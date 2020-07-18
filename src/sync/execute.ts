import { executeRecipe } from '../recipes';
import { map } from './map';

export const execute = executeRecipe(map, (action) => (t) => {
  action(t);
  return t;
});
