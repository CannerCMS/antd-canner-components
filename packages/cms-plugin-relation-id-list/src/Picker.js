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
  pickedIds: List<string>,
  id: string,
  relation: {
    relationship: string,
    relationTo: string,
    relationOn: string
  },
  columns: Array<{
    title: string,
    key: string,
    datIndex: string
  }>
};

type State = {
  value: List<*>,
  selectedRowKeys: Array<string>
};

export default class Picker extends PureComponent<Props, State> {
  componentId: string;
  queue: Array<changeArg>;
  static contextTypes = {
    fetch: PropTypes.func,
    subscribe: PropTypes.func
  }

  constructor(props: Props) {
    super(props);
    this.state = {
      value: new List(),
      selectedRowKeys: props.pickedIds.toJS()
    };
    this.componentId = 'test';
  }
  
  componentWillReceiveProps(nextProps: Props) {
    this.setState({
      selectedRowKeys: nextProps.pickedIds.toJS()
    });
  }

  componentDidMount() {
    const {fetch} = this.context;
    const {relation} = this.props;
    const {relationTo} = relation;
    fetch(relationTo, this.componentId, {})
      .then(ctx => {
        this.setState({
          value: ctx.response.body
        });
      });
  }

  handleCancel = () => {
    this.props.onCancel();
  }

  handleOk = () => {
    this.props.onOk(fromJS(this.state.selectedRowKeys));
  }

  rowSelectOnChange = (selectedRowKeys: Array<string>) => {
    this.setState({
      selectedRowKeys
    })
  }

  render() {
    const { visible, columns } = this.props;
    const { value, selectedRowKeys } = this.state;
    return <Modal
      onOk={this.handleOk}
      onCancel={this.handleCancel}
      visible={visible}
    >
      <Table
        rowSelection={{
          onChange: this.rowSelectOnChange,
          selectedRowKeys: selectedRowKeys
        }}
        columns={columns}
        dataSource={value.toJS().map(v => ({key: v._id, ...v}))}
      />
    </Modal>
  }
}