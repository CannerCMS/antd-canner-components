// @flow
import React, {Component} from 'react';
import {Select, Icon} from 'antd';
const Option = Select.Option;
import styled from 'styled-components';
import {FormattedMessage} from 'react-intl';

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
  options: Array<{
    field: string,
    label: string,
    defaultOrder: 'ASC' | 'DESC'
  }>,
  changeOrder: ({
    sortField: string,
    sortOrder: string,
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
      key: props.defaultField || '',
    };
  }

  componentDidMount() {
    const {defaultField, options} = this.props; 
    const field = options.find(option => option.field === defaultField);
    if (defaultField) {
      this.onChange(defaultField);
    }
    if (field) {
      this.setState({
        order: order(field.defaultOrder ? field.defaultOrder.toUpperCase() : 'ASC')
      });
    }
    
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
    const {options, defaultField} = this.props;
    const {key, order} = this.state;
    return (
      <div style={{display: 'flex'}}>
        <Selector onChange={this.onChange} value={key} defaultValue={defaultField} allowClear placeholder={<FormattedMessage id="query.sort.placeholder"/>}>
          {(options || []).map((option, i) => <Option key={i} value={option.field}>{option.label}</Option>)}
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