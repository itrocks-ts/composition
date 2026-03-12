import { ObjectOrType } from '@itrocks/class-type'
import { decorate }     from '@itrocks/decorator/property'
import { decoratorOf }  from '@itrocks/decorator/property'

const COMPOSITE = Symbol('composite')

export function Composite<T extends object>(value = true)
{
	return decorate<T>(COMPOSITE, value)
}

export function compositeOf<T extends object>(target: ObjectOrType<T>, property: keyof T)
{
	return decoratorOf(target, property, COMPOSITE, false)
}
