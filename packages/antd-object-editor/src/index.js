// @flow
import React, { PureComponent } from "react";
import styled from 'styled-components';

// type
import type {ObjectDefaultProps} from 'types/ObjectDefaultProps';

type Props = ObjectDefaultProps
type State = {showEditor: boolean};
let Editor: any;

const Container = styled.div`
  .ql-editor {
    @media (max-width: 576px) {
      min-height: 100vh;
    }
    @media (min-width: 576px) {
      min-height: ${props => props.minHeight || '400px'};
    }
  }
`

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
    const {uiParams = {}} = this.props;
    return (
      <Container {...uiParams}>
        {this.state.showEditor && <Editor {...this.props}/>}
      </Container>
    )
  }
}