import { FluentAsyncIterable } from './types';
import {
  asyncIterableFuncs,
  asyncResolvingFuncs,
  asyncSpecial,
} from './mounters';
import { mountIterableFunctions, mountSpecial } from './mounters';
import { AnyIterable } from 'augmentative-iterable';
import { iterateAsync } from './utils';
import { getExtender, extend, defaultCookFunction } from 'extension-methods';

export const proxyReference: { [key: string]: Function } = {};
const handler = getExtender(proxyReference, defaultCookFunction, 'extender');

/**
 * Tranforms an asynchronous iterable into a [[FluentAsyncIterable]].
 * @typeparam T The type of the items in the async iterable.
 * @param iterable The asynchronous iterable instance.
 * @returns The [[FluentAsyncIterable]] instance.
 */
function fluentAsync<T>(
  iterable: AnyIterable<T> | PromiseLike<AnyIterable<T>>,
): FluentAsyncIterable<T> {
  return extend(iterateAsync(iterable), handler) as any;
}

Object.assign(proxyReference, {
  ...mountIterableFunctions(asyncIterableFuncs, fluentAsync),
  ...mountSpecial(asyncSpecial, fluentAsync, fluentAsync),
  ...asyncResolvingFuncs,
});

export default fluentAsync;
