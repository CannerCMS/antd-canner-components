// @flow
import React, { Component } from "react";

type Props = defaultProps & {
  value: {[string]: any}
} & otherProps

export default class Fieldset extends Component<Props> {
  render() {
    const { id, renderChildren, value } = this.props;
    /**
     * pass onChange, cannerJSON, and id to each child
     */
    const childrenWithProps = renderChildren({
      id,
      value
    });
    return <fieldset style={{border: 0}}>{childrenWithProps}</fieldset>;
  }
}
