// @flow

import type { Node } from "react";

declare type defaultProps = {
  id: string,
  title: string,
  description: string,
  value: any,
  items: { [string]: any },
  uiParams: { [string]: any },
  validation: { [string]: any }, // The validator HOC deal with it.
  readOnly: boolean,
  onChange: (
    id: string | { firstId: string, secondId: string },
    type: string,
    any
  ) => void
};

declare type otherProps = {
  loading: boolean, // The endpoint HOC will pass this value to the first layer plugins to let them know whether data is fetched, so only object and array plugins have to deal with loading status.
  emptyImage: string, // Only array type plugins have the empty states, they will show the emptyImage if the array length is 0.
  renderChildren: (node: any, props: any | (any => any)) => Node,
  generateId: any => string,
  createEmptyData: ({[string]: any}) => any
};
