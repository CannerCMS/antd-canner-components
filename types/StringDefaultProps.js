// @flow
import type {FieldId, FieldDisabled} from './DefaultProps';

export type StringDefaultProps = {|
  id: FieldId,
  disabled: FieldDisabled,
  value: string,
  onChange: (id: string, type: string, value: string) => Promise<void>
|};
