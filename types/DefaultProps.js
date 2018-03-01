// @flow
import type { Node } from "react";

/**
|--------------------------------------------------
| pass from parent
|--------------------------------------------------
*/
export type FieldId = string;
// pass the rest routes to let hoc know whether components should be rendered
// eg: ['posts', '0', 'title']
export type RoutesArr = Array<string>;

// hoc: withRequest
// https://github.com/Canner/qa-generator/blob/master/src/hocs/withRequest.js
export type OnChangeFn = (
  id: string | { firstId: string, secondId: string } | Array<OnChangeFn>,
  type?: string,
  value?: any
) => void;

// hoc: withRelation
// only used in relation
// https://github.com/Canner/qa-generator/blob/master/src/hocs/relation.js
export type FetchRelationFn = Function;

/**
|--------------------------------------------------
| pass from generator
|--------------------------------------------------
*/
export type FieldTitle = string;
export type FieldDescription = string;
/**
* schema.items
* eg: {
*   type: 'array',
*   ui: 'tab',
*   items: {} <-- this
* }
*/
export type FieldItems = { [string]: any };
export type FieldUiParams = { [string]: any };
export type FieldDisabled = boolean;
export type FieldReadOnly = boolean;

// just combine the id, used in array
// https://github.com/Canner/qa-generator/tree/master/src/utils
export type GenerateIdFn = (...any) => string;

// in array, use this function to create empty data
// https://github.com/Canner/qa-generator/tree/master/src/utils
export type CreateEmptyDataFn = ({[string]: any}) => any;

// transform data to immutable
// https://github.com/Canner/qa-generator/tree/master/src/utils
export type TransformDataFn = any => any;

// parent component will call this method to render their children,
// in component, their are two required props `id`, `routes`,
// eg: <div>
//   {renderChildren({id: `${this.props.id}/${index}`, routes: this.props.routes})}
// </div>
// https://github.com/Canner/qa-generator/blob/master/src/index.js
export type RenderChildrenFn = (node: any, props: any | (any => any)) => Node;

// only relation component get this
export type Relation = {
  relationship: string,
  relationTo: string,
  pickOne?: string,
  foreignKey?: string
};

// the route controller
// goTo('/my/url')
// https://github.com/Canner/qa-generator/blob/master/src/index.js
export type GotoFn = string => void;

// the baseUrl
// eg: in canner-web, the baseUrl=/apps/APP-URL/restfulqa
// https://github.com/Canner/qa-generator/blob/master/src/index.js
export type BaseUrl = string;

// not supported
export type Loading = boolean; // The endpoint HOC will pass this value to the first layer plugins to let them know whether data is fetched, so only object and array plugins have to deal with loading status.
export type EmptyImage = string; // Only array type plugins have the empty states, they will show the emptyImage if the array length is 0.


