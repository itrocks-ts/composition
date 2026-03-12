import { ObjectOrType } from '@itrocks/class-type'
import { decorate }     from '@itrocks/decorator/property'
import { decoratorOf }  from '@itrocks/decorator/property'

const COMPONENT = Symbol('component')

export function Component<T extends object>(value = true)
{
	return decorate<T>(COMPONENT, value)
}

export function componentOf<T extends object>(target: ObjectOrType<T>, property: keyof T)
{
	return decoratorOf(target, property, COMPONENT, false)
}
