import { ResolverType, Iterate, isOrderAssured } from '../types-internal';
import { AnyMapper } from '../types-internal';
import { AnyIterable } from 'augmentative-iterable';
import { map } from '../sync/map';
import { orderedGroupRecipe } from './ordered-group-recipe';
import { GroupIngredients } from './ingredients';

export function groupRecipe(ingredients: GroupIngredients) {
  const orderedGroup = orderedGroupRecipe(ingredients);
  const { reduceAndMap, resolver, iterate } = ingredients;
  return function <T, R>(this: AnyIterable<T>, mapper: AnyMapper<T>) {
    if (isOrderAssured(mapper)) {
      return orderedGroup.call(this, mapper);
    } else {
      const reduced = reduceAndMap.call(
        this,
        (g: any, t: any) =>
          resolver(mapper(t), (key) => {
            const values = g.get(key) || [];
            values.push(t);
            g.set(key, values);
            return g;
          }),
        new Map<R, T[]>(),
        (x: any) => x.entries(),
      );

      const resolved = resolver(reduced, (r) =>
        map.call(r, (([key, values]: [any, any]) => ({ key, values })) as any),
      );
      return iterate(resolved);
    }
  };
}
