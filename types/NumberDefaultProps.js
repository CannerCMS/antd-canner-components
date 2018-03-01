// @flow
import type {FieldId, FieldDisabled} from './DefaultProps';

export type NumberDefaultProps = {|
  id: FieldId,
  disabled: FieldDisabled,
  value: number,
  onChange: (id: string, type: string, value: number) => void
|};
