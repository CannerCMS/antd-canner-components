// @flow
import React, {PureComponent} from 'react';
import {Map, List, fromJS} from 'immutable';
import {Modal, Table, Button, Icon} from 'antd';
const ButtonGroup = Button.Group;
import type {FieldId} from 'types/DefaultProps';
import styled from 'styled-components';

type Props = {
  title: string,
  onOk: Function,
  onCancel: Function,
  renderChildren: Function,
  visible: boolean,
  pickedIds: string[],
  pickOne?: boolean,
  refId: FieldId,
  relation: {
    to: string,
    type: string,
  },
  updateQuery: Function,
  fetch: Function,
  fetchRelation?: Function,
  columns: Array<{
    title: string,
    key: string,
    datIndex: string
  }>,
  subscribe: Function,
};

type State = {
  totalValue: List<*>,
  value: List<*>,
  hasNextPage: boolean,
  selectedRowKeys: Array<string>
};

const ButtonWrapper = styled.div`
  text-align: right;
  margin-top: 16px;
`;

export default class Picker extends PureComponent<Props, State> {
  componentId: string;
  subscription: any;

  constructor(props: Props) {
    super(props);
    this.state = {
      totalValue: new List(),
      value: new List(),
      hasNextPage: false,
      selectedRowKeys: props.pickedIds ? props.pickedIds : []
    };
    this.componentId = `${props.refId.toString()}/PICK`;
  }
  
  componentWillReceiveProps(nextProps: Props) {
    this.setState({
      selectedRowKeys: nextProps.pickedIds ? nextProps.pickedIds : []
    });
  }

  componentDidMount() {
    this.fetchData();
  }

  nextPage = () => {
    const {updateQuery, relation} = this.props;
    const {hasNextPage, value} = this.state;
    if (hasNextPage) {
      updateQuery([relation.to], {
        pagination: {
          after: (value.last() || new Map()).get('id'),
          first: 10
        }
      });
    }
  }

  prevPage = () => {
    const {updateQuery, relation} = this.props;
    const {value} = this.state;
    updateQuery([relation.to], {
      pagination: {
        before: (value.first() || new Map()).get('id'),
        last: 10
      }
    });
  }

  fetchData = () => {
    const {relation, fetch} = this.props;

    return fetch(relation.to)
      .then(data => {
        this.updateData(data);
        this.subscribe();
      });
  }

  updateData = (data: any) => {
    let {totalValue} = this.state;
    const list = data.get('edges').map(edge => edge.get('node'));
    list.forEach(item => {
      const index = totalValue.findIndex(v => v.get('id') === item.get('id'));
      if (index === -1) {
        totalValue = totalValue.push(item);
      } else {
        totalValue.set(index, item);
      }
    });
    this.setState({
      totalValue,
      value: list,
      hasNextPage: data.getIn(['pageInfo', 'hasNextPage']),
    });
  }

  subscribe = () => {
    const {subscribe, relation} = this.props
    this.subscription = subscribe(relation.to, this.updateData);
  }

  handleCancel = () => {
    this.props.onCancel();
  }

  handleOk = () => {
    this.props.onOk(fromJS(this.state.selectedRowKeys), this.state.totalValue);
  }

  rowSelectOnChange = (selectedRowKeys: Array<string>) => {
    this.setState({
      selectedRowKeys
    });
  }

  componentWillUnmount() {
    if (this.subscription) {
      this.subscription.unsubscribe();
      delete this.subscription;
    }
  }

  render() {
    const { visible, columns, pickOne = false } = this.props;
    const { value, selectedRowKeys, hasNextPage } = this.state;

    return <Modal
      onOk={this.handleOk}
      onCancel={this.handleCancel}
      visible={visible}
    >
      <Table
        rowSelection={{
          type: (pickOne) ? "radio" : "checkbox",
          onChange: this.rowSelectOnChange,
          selectedRowKeys: selectedRowKeys
        }}
        size="middle"
        columns={columns}
        // $FlowFixMe
        dataSource={value.toJS().map(v => ({key: v.id, ...v}))}
        pagination={false}
      />
      <ButtonWrapper>
        <ButtonGroup>
          <Button onClick={this.prevPage}>
            <Icon type="left" />
            Previous Page
          </Button>
          <Button disabled={!hasNextPage} onClick={this.nextPage}>
            Next Page
            <Icon type="right" />
          </Button>
        </ButtonGroup>
      </ButtonWrapper>
    </Modal>
  }
}
