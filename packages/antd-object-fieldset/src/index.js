// @flow
import React, { Component } from "react";

type Props = defaultProps & {
  value: {[string]: any}
}

export default class Fieldset extends Component<Props> {
  render() {
    const { id, renderChildren, routes } = this.props;
    /**
     * pass onChange, and id to each child
     */
    const childrenWithProps = renderChildren({
      id,
      routes
    });
    return (
      <fieldset style={{border: 0}}>
        {childrenWithProps}
      </fieldset>
    );
  }
}
