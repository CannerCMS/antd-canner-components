// @flow
import React, {Component} from 'react';
import {Pagination} from 'antd';
import styled from 'styled-components';
const Wrapper = styled.div`
  text-align: right;
  margin-top: ${props => props.marginTop}px;
  margin-right: ${props => props.marginRight}px;
  display: inline-block;
`;

type Props = {
  changePage: number => void,
  changeSize: (size: number) => void,
  pageSize: number,
  total: number,
  current: number
}

export default class PaginationPlugin extends Component<Props> {
  render() {
    const {total, changePage, current, changeSize, pageSize} = this.props;
    return <div style={{display: 'flex', justifyContent: 'flex-end'}}>
      <Wrapper marginTop={16} marginRight={16}>
        <Pagination
          pageSize={pageSize}
          total={total}
          current={current}
          onShowSizeChange={changeSize}
          onChange={changePage}
        />
      </Wrapper>
    </div>;
  }
}
