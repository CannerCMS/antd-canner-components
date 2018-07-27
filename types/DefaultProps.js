// @flow
import type { Node } from "react";

/**
|--------------------------------------------------
| pass from parent
|--------------------------------------------------
*/

type RefId = any;

export type FieldId = RefId;
// pass the rest routes to let hoc know whether components should be rendered
// eg: ['posts', '0', 'title']
export type RoutesArr = Array<string>;

// hoc: withRequest
// https://github.com/Canner/qa-generator/blob/master/src/hocs/withRequest.js

export type OnChangeFn = ((refId: FieldId | {[string]: FieldId}, type: string, value?: any) => Promise<void>) & (Array<{
  refId: FieldId | {[string]: FieldId},
  type: string,
  value?: any
}> => Promise<void>);

// hoc: withRelation
// only used in relation
// https://github.com/Canner/qa-generator/blob/master/src/hocs/relation.js
export type FetchRelationFn = Function;
export type Fetch = Function;

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

// in array, use this function to create empty data
// https://github.com/Canner/qa-generator/tree/master/src/utils
export type CreateEmptyDataFn = ({[string]: any}) => any;

// transform data to immutable
// https://github.com/Canner/qa-generator/tree/master/src/utils
export type TransformDataFn = any => any;

// deploy function in array
export type DeployFn = (fieldId: FieldId, callback?: Function) => Promise<*>

// only relation component get this
export type FieldRelation = {
  to: string,
  type: string
};

// the route controller
// goTo('/my/url')
// https://github.com/Canner/qa-generator/blob/master/src/index.js
export type GotoFn = string => void;

// not supported
export type Loading = boolean; // The endpoint HOC will pass this value to the first layer plugins to let them know whether data is fetched, so only object and array plugins have to deal with loading status.
export type EmptyImage = string; // Only array type plugins have the empty states, they will show the emptyImage if the array length is 0.


