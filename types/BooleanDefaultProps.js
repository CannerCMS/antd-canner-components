// @flow
import type {FieldId, FieldDisabled} from './DefaultProps';

export type BooleanDefaultProps = {|
  id: FieldId,
  disabled: FieldDisabled,
  value: boolean,
  onChange: (id: string, type: string, value: boolean) => Promise<void>
|};
