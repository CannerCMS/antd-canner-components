// @flow
import React, {Component} from 'react';
import {Select, Icon} from 'antd';
const Option = Select.Option;
import styled from 'styled-components';

const Selector = styled(Select)`
  width: 150px;
  margin: 0 15px;
`;

const OrderSwitch = styled.div`
  cursor: pointer;
  display: flex;
  flex-direction: column;
`;

const UpIcon = styled(Icon)`
  color: ${props => props.order > 0 ? '#333' : '#ccc'};
`;

const DownIcon = styled(Icon)`
  color: ${props => props.order > 0 ? '#ccc' : '#333'};
`

type Props = {
  sortField: ?string,
  items: Object,
  sort: Array<{
    field: string,
    label: string
  }>,
  sortField: 'ASC' | 'DESC',
  changeOrder: ({
    sortField: string,
    sortField: string
  }) => void,
  defaultField: string
}

type State = {
  order: boolean,
  key: string
}

export default class Sort extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      order: order(props.sortType || 'ASC'),
      key: props.sortField || '',
    };
  }

  onChange = (value: string) => {
    this.setState({
      key: value
    }, this.submit);
  }

  changeOrder = () => {
    this.setState({
      order: !this.state.order,
    }, this.submit);
  }

  submit = () => {
    const {changeOrder} = this.props;
    const {key, order} = this.state;
    changeOrder({
      sortField: key,
      sortType: order ? 'ASC' : 'DESC'
    });
  }

  render() {
    const {sort, defaultField} = this.props;
    const {key, order} = this.state;
    return (
      <div style={{display: 'flex'}}>
        <Selector onChange={this.onChange} value={key} defaultValue={defaultField} allowClear>
          {(sort || []).map((cond, i) => <Option key={i} value={cond.field}>{cond.label}</Option>)}
        </Selector>
        <OrderSwitch onClick={this.changeOrder}>
          <UpIcon order={order} type="caret-up" />
          <DownIcon order={order} type="caret-down" />
        </OrderSwitch>
      </div>
    );
  }
}


function order(sortField) {
  return sortField === 'ASC';
}