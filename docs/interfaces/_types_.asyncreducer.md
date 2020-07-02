[fluent-iterable - v0.2.0](../README.md) › ["types"](../modules/_types_.md) › [AsyncReducer](_types_.asyncreducer.md)

# Interface: AsyncReducer ‹**T, A**›

Represents an asynchronous reducer of type `T` into the accumulator type `A`.<br>
  Example: `const sumReducer: AsyncReducer<Channel, number> = async (sum, next) => sum + await getNumberOfMessages(next)`

## Type parameters

▪ **T**

The source type.

▪ **A**

The accumulator type.

## Hierarchy

* **AsyncReducer**

## Callable

▸ (`current`: A, `next`: T): *Promise‹A›*

Asynchronously generates the next accumulator item based on the previous one and the next item under reduce.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`current` | A | The previous accumulator value. |
`next` | T | The next item. |

**Returns:** *Promise‹A›*

A promise of the new accumulator value.
