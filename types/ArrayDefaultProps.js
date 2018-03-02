// @flow
import type {FieldId, TransformDataFn} from './DefaultProps';
import type {List} from 'immutable';

export type ArrayDefaultProps<T> = {|
  id: FieldId,
  transformData: TransformDataFn,
  value: List<T>,
  onChange: (id: string | {[string]: string}, type: string, value?: List<T>) => Promise<void>
|};
