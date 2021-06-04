import { basic } from './basic-ingredients';
import { distinctRecipe } from '../recipes';
import { all } from './all';
import { filter } from './filter';
import { hasLessOrExactly } from './has-less-or-exactly';
import { partition } from './partition';
import { reduce } from './reduce';
import { Ingredient, ResolverIngredient } from '../recipes/ingredients';

function distinctSyncRecipe(filterOrAll: Ingredient | ResolverIngredient) {
  return distinctRecipe({
    ...basic,
    partition,
    filterOrAll,
    hasLessOrExactly,
    reduce,
  });
}

export const distinct = distinctSyncRecipe(filter);
export const isDistinct = distinctSyncRecipe(all);
