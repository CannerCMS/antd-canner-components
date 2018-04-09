// @flow
import type {FieldId} from './DefaultProps';
import type {List, Map} from 'immutable';

export type ObjectDefaultProps = {|
  refId: FieldId,
  value: Map<string, *>,
  onChange:
    (refId: FieldId | {[string]: FieldId}, type: string, value?: any) => Promise<void>
    | (Array<{
      refId: FieldId | {[string]: FieldId},
      type: string,
      value?: any
    }>) => Promise<void>
|};
