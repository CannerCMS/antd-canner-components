// @flow
export type PrimitiveTypes<T> = {
  value?: T,
  // eslint-disable-next-line
  onChange?: (id: string, type: string, value: T) => Promise<void>
}

export type ArrayTypes<T> = {
  value?: Array<T>,
  onChange?: (id: string, type: string, value: Array<T>) => Promise<void>
}

export type ObjectTypes = {
  value?: Object,
  onChange?: (id: string, type: string, value: Object) => Promise<void>
}