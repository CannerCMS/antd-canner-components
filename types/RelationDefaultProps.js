// @flow
import type {FieldId, FieldRelation, FetchRelationFn, OnChangeFn} from './DefaultProps';
import type {List, Map} from 'immutable';

export type RelationDefaultProps = {|
  refId: FieldId,
  value: List<Map<string, any>>,
  relation: FieldRelation,
  onChange: OnChangeFn,
  fetchRelation: FetchRelationFn
|};
