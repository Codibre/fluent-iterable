import { getExtender, defaultCookFunction } from 'extension-methods';
export const asyncProxyReference: { [key: string]: Function } = {};
export const asyncHandler = getExtender(
  asyncProxyReference as any,
  defaultCookFunction,
  'extender',
);
