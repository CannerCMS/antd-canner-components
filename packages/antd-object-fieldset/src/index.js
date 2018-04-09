// @flow
import * as React from "react";
import {Item} from '@canner/react-cms-helpers';

export default class Fieldset extends React.Component<*> {
  render() {
    /**
     * pass onChange, and id to each child
     */
    return (
      <fieldset style={{border: 0}}>
        <Item />
      </fieldset>
    );
  }
}
