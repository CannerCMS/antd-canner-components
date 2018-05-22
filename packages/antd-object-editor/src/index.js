// @flow

import React, { PureComponent } from "react";
import CannerEditor from 'canner-slate-editor';
import {Value} from 'slate';
import {State} from "markup-it";
import html from 'markup-it/lib/html';
const htmlSerializer = State.create(html);
// type
import type {ObjectDefaultProps} from 'types/ObjectDefaultProps';

type Props = ObjectDefaultProps & {
  onDeploy: Function
}


export default class Editor extends PureComponent<Props, State> {
  stateKey: string;
  htmlKey: string;

  constructor(props: Props) {
    super(props);
    this.stateKey = 'state';
    this.htmlKey = 'html';
    const state = props.value.get(this.stateKey);
    this.state = {
      value: Value.fromJSON(JSON.parse(state || "{}")),
    };
    props.onDeploy(value => {
      const state = this.state.value;
      const html = htmlSerializer.serializeDocument(state.document);
      return {
        [this.stateKey]: JSON.stringify(state),
        [this.htmlKey]: html
      };
    });
  }

  onChange = ({value}: {value: Value}) => {
    this.setState({
      value
    });
  }

  render() {
    const {value} = this.state;
    return (
      <CannerEditor
        value={value}
        onChange={this.onChange}
      />
    )
  }
}
