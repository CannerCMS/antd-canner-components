// @flow

import type { Node } from "react";

declare type changeArg = {
  id: string,
  type: string,
  value: any
}

declare type defaultProps = {
  /**
  |--------------------------------------------------
  | pass from generator
  |--------------------------------------------------
  */
  title: string,
  description: string,
  /**
   * schema.items
   * eg: {
   *   type: 'array',
   *   ui: 'tab',
   *   items: {} <-- this
   * }
   */
  items: { [string]: any },
  uiParams: { [string]: any },
  readOnly: boolean,

  // just combine the id, used in array
  generateId: (...any) => string,

  // in array, use this function to create empty data
  createEmptyData: ({[string]: any}) => any,

  // transform data to immutable
  transformData: any => any,

  // parent component will call this method to render their children,
  // in component, their are two required props `id`, `routes`,
  // eg: <div>
  //   {renderChildren({id: `${this.props.id}/${index}`, routes: this.props.routes})}
  // </div>
  renderChildren: (node: any, props: any | (any => any)) => Node,

  // only relation component get this
  relation: {
    relationship: string,
    relationTo: string,
    pickOne?: string,
    foreignKey?: string
  },

  // the route controller
  // goTo('/my/url')
  goTo: string => void,

  // the baseUrl
  // eg: in canner-web, the baseUrl=/apps/APP-URL/restfulqa
  baseUrl: string,

  // not supported
  loading: boolean, // The endpoint HOC will pass this value to the first layer plugins to let them know whether data is fetched, so only object and array plugins have to deal with loading status.
  // not supported
  emptyImage: string, // Only array type plugins have the empty states, they will show the emptyImage if the array length is 0.







  /**
  |--------------------------------------------------
  | pass from hoc
  |--------------------------------------------------
  */
  // the value of this component
  // hoc: withQuery
  value: any,
  // the rootValue of this entity (the value of first layer)
  // hoc: withQuery
  rootValue: any,


  // hoc: withRequest
  onChange: (
    id: string | { firstId: string, secondId: string } | Array<changeArg>,
    type?: string,
    value?: any
  ) => void,

  // hoc: withRelation
  // only used in relation
  fetchRelation: Function,


  /**
  |--------------------------------------------------
  | pass from parent
  |--------------------------------------------------
  */

  id: string,
  // pass the rest routes to let hoc know whether components should be rendered
  // eg: ['posts', '0', 'title']
  routes: Array<string>,
  
};
