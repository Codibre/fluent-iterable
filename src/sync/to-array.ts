export const toArray: <T>(iterable: Iterable<T>) => T[] = Array.from.bind(
  Array,
);
