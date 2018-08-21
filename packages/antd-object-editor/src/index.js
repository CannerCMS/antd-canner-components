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
    Editor = require('./editor');
    this.setState({showEditor: true});
  }

  render() {
    return (
      <div>
        {this.state.showEditor && <Editor {...this.props}/>}
      </div>
    )
  }
}