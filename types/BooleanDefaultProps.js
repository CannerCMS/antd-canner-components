// @flow
import type {FieldId, FieldDisabled} from './DefaultProps';

export type BooleanDefaultProps = {|
  refId: FieldId,
  disabled: FieldDisabled,
  value: boolean,
  onChange: (id: FieldId, type: string, value: boolean) => Promise<void>
|};
