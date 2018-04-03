// @flow
import type {FieldId, FieldDisabled} from './DefaultProps';

export type NumberDefaultProps = {|
  refId: FieldId,
  disabled: FieldDisabled,
  value: number,
  onChange: (id: FieldId, type: string, value: number) => Promise<void>
|};
