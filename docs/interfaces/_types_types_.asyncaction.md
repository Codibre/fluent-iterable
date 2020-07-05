[fluent-iterable - v0.3.2](../README.md) › ["types/types"](../modules/_types_types_.md) › [AsyncAction](_types_types_.asyncaction.md)

# Interface: AsyncAction ‹**T**›

Represents an asynchronous action on an item of type `T`.<br>
  Example: `const createUserAction: AsyncAction<User> = async user => await database.put(user);`

## Type parameters

▪ **T**

The type of the item the action is defined on.

## Hierarchy

* **AsyncAction**

## Callable

▸ (`item`: T): *Promise‹unknown› | unknown*

Specifies the asynchronous action to perform on `item`.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`item` | T | The item the action is performed against. |

**Returns:** *Promise‹unknown› | unknown*

The promise of any action.
