// @flow
import type {List} from 'immutable';

export type PrimitiveTypes<T> = {
  value?: T,
  // eslint-disable-next-line
  onChange?: (id: string, type: string, value: T) => Promise<void>
}

export type ArrayTypes<T> = {
  value?: List<T> | Array<T>,
  onChange?: (id: string, type: string, value: List<T> | Array<T>) => Promise<void>
}

export type ObjectTypes = {
  value?: Object,
  onChange?: (id: string, type: string, value: Object) => Promise<void>
}