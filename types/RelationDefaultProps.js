// @flow
import * as React from 'react';
import type {FieldId, FieldRelation, FetchRelationFn, Fetch, OnChangeFn} from './DefaultProps';

export type RelationDefaultProps = {|
  refId: FieldId,
  value: any,
  relation: FieldRelation,
  onChange: OnChangeFn,
  fetchRelation: FetchRelationFn,
  fetch: Fetch, 
  relationValue: any,
  Toolbar: React.ComponentType<*>
|};
