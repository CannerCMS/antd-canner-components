// @flow

import React, { PureComponent } from "react";
import CannerEditor from 'canner-slate-editor';
import {Value} from 'slate';
import {State} from "markup-it";
import html from 'markup-it/lib/html';
const htmlSerializer = State.create(html);
import {transformData} from "canner-helpers";

// type
import type {ObjectDefaultProps} from 'types/ObjectDefaultProps';

type Props = ObjectDefaultProps & {
  onDeploy: Function
}

const defaultState = {
  document: {
    nodes: [
      {
        object: 'block',
        type: 'paragraph',
        nodes: [
          {
            object: 'text',
            leaves: [
              {
                text: '',
              }
            ],
          },
        ],
      },
    ],
  }
};

export default class Editor extends PureComponent<Props, State> {
  stateKey: string;
  htmlKey: string;

  // quick fix,
  // slate-editor will call onChange when mounted,
  // use this variable to check it's the first call or not
  firstOnChange = false;

  constructor(props: Props) {
    super(props);
    this.stateKey = 'state';
    this.htmlKey = 'html';
    const state = props.value[this.stateKey];
    this.state = {
      value: Value.fromJSON(state ? JSON.parse(state) : defaultState),
    };
    props.onDeploy(() => {
      const state = this.state.value;
      const html = htmlSerializer.serializeDocument(state.document);
      return {
        [this.stateKey]: JSON.stringify(state),
        [this.htmlKey]: html
      };
    });
  }

  onChange = ({value}: {value: Value}) => {
    const {refId, onChange} = this.props;
    if (this.firstOnChange) {
      onChange(refId, 'update', transformData({}));
    } else {
      this.firstOnChange = true;
    }
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
