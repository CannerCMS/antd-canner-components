// @flow

import type { Node } from "react";

declare type changeArg = {
  id: string,
  type: string,
  value: any
}

declare type defaultProps = {
  id: string,
  title: string,
  description: string,
  value: any,
  items: { [string]: any },
  uiParams: { [string]: any },
  validation: { [string]: any }, // The validator HOC deal with it.
  readOnly: boolean,
  generateId: (...any) => string,
  createEmptyData: ({[string]: any}) => any,
  transformData: any => any,
  renderChildren: (node: any, props: any | (any => any)) => Node,
  onChange: (
    id: string | { firstId: string, secondId: string } | Array<changeArg>,
    type?: string,
    value?: any
  ) => void,
  loading: boolean, // The endpoint HOC will pass this value to the first layer plugins to let them know whether data is fetched, so only object and array plugins have to deal with loading status.
  emptyImage: string, // Only array type plugins have the empty states, they will show the emptyImage if the array length is 0.
  relation: {
    relationship: string,
    relationTo: string,
    relationOn?: string,
    foreignKey?:string
  },
  routes: Array<string>,
  goTo: string => void,
  baseUrl: string,
  rootValue: any,
  fetchRelation: Function
};
