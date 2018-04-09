// @flow
import type {FieldId, FieldDisabled} from './DefaultProps';

export type StringDefaultProps = {|
  refId: FieldId,
  disabled: FieldDisabled,
  value: string,
  onChange: (id: FieldId, type: string, value: string) => Promise<void>
|};
