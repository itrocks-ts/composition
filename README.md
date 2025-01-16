[![npm version](https://img.shields.io/npm/v/@itrocks/composition?logo=npm)](https://www.npmjs.org/package/@itrocks/composition)
[![npm downloads](https://img.shields.io/npm/dm/@itrocks/composition)](https://www.npmjs.org/package/@itrocks/composition)
[![GitHub](https://img.shields.io/github/last-commit/itrocks-ts/composition?color=2dba4e&label=commit&logo=github)](https://github.com/itrocks-ts/composition)
[![issues](https://img.shields.io/github/issues/itrocks-ts/composition)](https://github.com/itrocks-ts/composition/issues)
[![discord](https://img.shields.io/discord/1314141024020467782?color=7289da&label=discord&logo=discord&logoColor=white)](https://25.re/ditr)

# composition

Manage and query composite and component property structures.

## Summary

This module facilitates the creation of composite and component relationships
within TypeScript classes using decorators.

## Installation

```bash
npm i @itrocks/composition
```

## Example Use Case

### Car, Engine and Wheels

Imagine a vehicle management system where a `Car` class is a composite containing those components:
1. An `Engine` class representing a single object component.
2. A collection of `Wheel` objects.

```ts
import { Composite, Component } from '@itrocks/composition'

class Engine {
	@Composite() car: Car
	constructor(
		public type: string,
		public serialNumber: string
	) {}
}

class Wheel {
	@Composite() car: Car
	constructor(
		public diameter: number,
		public serialNumber: string
	) {}
}

class Car {
	constructor(
		@Component() public engine: Engine,
		@Component() public wheels: Wheel[]
	) {
		engine.car = this
		wheels.forEach(wheel => wheel.car = this)
	}
}

const car = new Car(
	new Engine('V8', 'ENG12345'),
	[
		new Wheel(20, 'WHL001'),
		new Wheel(20, 'WHL002'),
		new Wheel(18, 'WHL003'),
		new Wheel(18, 'WHL004')
	]
)
```

### Verifying Components and Composites

You can check if properties are marked as components or composites:
```ts
import { componentOf, compositeOf } from '@itrocks/composition'

console.log(componentOf(Car,    'engine')) // true
console.log(componentOf(Car,    'wheels')) // true
console.log(compositeOf(Engine, 'car'   )) // true
console.log(compositeOf(Wheel,  'car'   )) // true
console.log(componentOf(Engine, 'car'   )) // false
console.log(compositeOf(Car,    'engine')) // false
```

## API Reference

### @Component

```ts
@Component(value: boolean = true)
```
A decorator to mark a property as a component.

**Parameters:**
- `value` (boolean, default: true):
  Activates or deactives the property as a component.
  Setting this value to `false` overrides a `true` value on the same property on a parent class.

**Usage:**
```ts
class Car {
	@Component()
	engine: Engine
}
```

### componentOf

```ts
componentOf<T extends object>(target: ObjectOrType<T>, property: KeyOf<T>): boolean
```
Checks whether a property is marked as a [Component](#component).

**Parameters:**
- `target` ([ObjectOrType](https://github.com/itrocks-ts/class-type#objectortype)):
  The target class or object to check.
- `property` ([KeyOf](https://github.com/itrocks-ts/class-type#keyof)):
  The name of the property to verify.

**Returns:**
`boolean`: `true` if the property is marked as a [Component](#component), `false` otherwise.

**Usage:**
```ts
console.log(componentOf(Car, 'engine')) // true
```

### @Composite

```ts
@Composite(value: boolean = true)
```
A decorator to mark a property as a composite.

**Parameters:**
- `value` (boolean, default: true):
  Activates or deactivates the property as a composite.
  Setting this value to `false` overrides a `true` value on the same property on a parent class.  

**Usage:**
```ts
class Engine {
	@Composite()
  car: Car
}
```

### compositeOf

```ts
compositeOf<T extends object>(target: ObjectOrType<T>, property: KeyOf<T>): boolean
```
Checks whether a property is marked as a [composite](#composite).

**Parameters:**
- `target` ([ObjectOrType](https://github.com/itrocks-ts/class-type#objectortype)):
  The target class or object to check.
- `property` ([KeyOf](https://github.com/itrocks-ts/class-type#keyof)):
  The name of the property to verify.

**Returns:**
`boolean`: `true` if the property is marked as a [Composite](#composite), `false` otherwise.

**Usage:**
```ts
console.log(compositeOf(Engine, 'car')) // true
```
