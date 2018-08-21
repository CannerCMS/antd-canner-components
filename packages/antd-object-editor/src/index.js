// @flow
import React, { PureComponent } from "react";
import NoSSR from 'react-no-ssr';
import Editor from './editor';

// type
import type {ObjectDefaultProps} from 'types/ObjectDefaultProps';

type Props = ObjectDefaultProps


export default class EditorContainer extends PureComponent<Props, {}> {
  render() {
    return (
      <NoSSR>
        <Editor {...this.props}/>
      </NoSSR>
    )
  }
}