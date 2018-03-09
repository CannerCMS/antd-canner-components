// @flow

export type PrimitiveTypes<T> = {
  value?: T,
  // eslint-disable-next-line
  onChange?: (id: string, type: string, value: T) => Promise<void>
}