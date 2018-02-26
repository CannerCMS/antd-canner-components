// @flow
import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {List, fromJS} from 'immutable';
import {Modal} from 'antd';
import {Table} from 'antd';
type Props = {
  title: string,
  onOk: Function,
  onCancel: Function,
  renderChildren: Function,
  visible: boolean,
  pickedIds: string[],
  pickOne?: boolean,
  id: string,
  relation: {
    relationship: string,
    relationTo: string,
    relationOn?: string
  },
  columns: Array<{
    title: string,
    key: string,
    datIndex: string
  }>
};

type State = {
  totalValue: List<*>,
  value: List<*>,
  page: number,
  totalPage: number,
  selectedRowKeys: Array<string>
};

export default class Picker extends PureComponent<Props, State> {
  componentId: string;
  queue: Array<changeArg>;
  goTo: (page: number) => ({[string]: number});
  static contextTypes = {
    fetch: PropTypes.func,
    subscribe: PropTypes.func
  }

  constructor(props: Props) {
    super(props);
    this.state = {
      totalValue: new List(),
      value: new List(),
      page: 1,
      totalPage: 1,
      selectedRowKeys: props.pickedIds ? props.pickedIds : []
    };
    this.componentId = `${props.id}/PICK`;
  }
  
  componentWillReceiveProps(nextProps: Props) {
    this.setState({
      selectedRowKeys: nextProps.pickedIds ? nextProps.pickedIds : []
    });
  }

  componentDidMount() {
    this.fetchData({start: 0, limit: 10});
  }

  changePage = (page: number) => {
    this.fetchData(this.goTo(page));
  }

  fetchData = (pagination: {[string]: number}) => {
    const {relation} = this.props;
    const {fetch} = this.context;
    return fetch(relation.relationTo, this.componentId, {pagination})
      .then(ctx => {
        this.goTo = ctx.response.pagination.goTo;
        let totalValue = this.state.totalValue;
        ctx.response.body.forEach(val => {
          if (!totalValue.find(nv => nv.get('_id') === val.get('_id'))) {
            totalValue = totalValue.push(val);
          }
        });
        this.setState({
          totalValue: totalValue,
          value: ctx.response.body,
          page: ctx.response.pagination.page,
          totalPage: ctx.response.pagination.totalPage
        });
      });
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

  render() {
    const { visible, columns, pickOne = false } = this.props;
    const { value, selectedRowKeys, page, totalPage } = this.state;
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
        pagination={{
          onChange: this.changePage,
          current: page,
          total: totalPage * 10
        }}
        size="middle"
        columns={columns}
        dataSource={value.toJS().map(v => ({key: v._id, ...v}))}
      />
    </Modal>
  }
}
