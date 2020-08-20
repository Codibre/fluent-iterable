[fluent-iterable - v1.5.0](../README.md) › ["types-base"](../modules/_types_base_.md) › [FluentGroup](_types_base_.fluentgroup.md)

# Interface: FluentGroup ‹**T, R**›

Represents a group of [fluent](../modules/_fluent_.md#fluent) items of type `T` with a key of type `R`.

## Type parameters

▪ **T**

The type of the items in the [FluentGroup](_types_base_.fluentgroup.md).

▪ **R**

The type of the key of the [FluentGroup](_types_base_.fluentgroup.md).

## Hierarchy

* [Group](_types_base_.group.md)‹T, R›

  ↳ **FluentGroup**

## Index

### Properties

* [key](_types_base_.fluentgroup.md#key)
* [values](_types_base_.fluentgroup.md#values)

## Properties

###  key

• **key**: *R*

*Inherited from [Group](_types_base_.group.md).[key](_types_base_.group.md#key)*

The key of the [Group](_types_base_.group.md).

___

###  values

• **values**: *[FluentIterable](_types_.fluentiterable.md)‹T›*

*Overrides [Group](_types_base_.group.md).[values](_types_base_.group.md#values)*

The [fluent](../modules/_fluent_.md#fluent) items in the [FluentGroup](_types_base_.fluentgroup.md).