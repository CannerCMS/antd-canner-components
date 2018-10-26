// @flow
import React, { PureComponent } from "react";

// type
import type {ObjectDefaultProps} from 'types/ObjectDefaultProps';

type Props = ObjectDefaultProps
type State = {showEditor: boolean};
let Editor: any;

export default class EditorContainer extends PureComponent<Props, State> {
  state = {
    showEditor: false
  }

  componentDidMount() {
    Editor = require('./editor').default;
    this.setState({showEditor: true});
  }

  componentWillUnmount() {
    Editor = null;
    this.setState({
      showEditor: false
    });
  }

  render() {
    return (
      <div>
        {this.state.showEditor && <Editor {...this.props}/>}
      </div>
    )
  }
}