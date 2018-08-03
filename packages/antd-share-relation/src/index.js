// @flow
import * as React from 'react';
import {Modal, Table} from 'antd';
import type {FieldId} from 'types/DefaultProps';
import {isEqual} from 'lodash';

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
  relationValue: any,
  columns: Array<{
    title: string,
    key: string,
    datIndex: string
  }>,
  subscribe: Function,
  Toolbar: React.ComponentType<*>
};

type State = {
  totalValue: Array<*>,
  value: Array<*>,
  selectedRowKeys: Array<string>
};

export default class Picker extends React.PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      totalValue: [],
      value: [],
      selectedRowKeys: props.pickedIds || []
    };
  }
  
  componentWillReceiveProps(nextProps: Props) {
    const {relationValue, pickedIds} = nextProps;
    if (!isEqual(pickedIds, this.props.pickedIds)) {
      this.setState({
        selectedRowKeys: pickedIds || []
      });
    }
    this.updateData(relationValue);
  }

  componentDidMount() {
    const {relationValue} = this.props;
    this.updateData(relationValue);
  }

  updateData = (data: any) => {
    let {totalValue} = this.state;

    const list = data.edges.map(edge => edge.node);
    list.forEach(item => {
      const index = totalValue.findIndex(v => v.id === item.id);
      if (index === -1) {
        totalValue.push(item);
      } else {
        totalValue[index] = item;
      }
    });
    this.setState({
      totalValue,
      value: list,
    });
  }

  handleCancel = () => {
    this.props.onCancel();
  }

  handleOk = () => {
    this.props.onOk(this.state.selectedRowKeys, this.state.totalValue);
  }

  rowSelectOnChange = (selectedRowKeys: Array<string>) => {
    this.setState({
      selectedRowKeys
    });
  }

  render() {
    const { visible, columns, pickOne = false, Toolbar } = this.props;
    const { value, selectedRowKeys} = this.state;
    return <Modal
      width={800}
      onOk={this.handleOk}
      onCancel={this.handleCancel}
      visible={visible}
    >
      <Toolbar>
        <Table
          style={{marginBottom: 16}}
          rowSelection={{
            type: (pickOne) ? "radio" : "checkbox",
            onChange: this.rowSelectOnChange,
            selectedRowKeys: selectedRowKeys
          }}
          size="middle"
          columns={columns}
          // $FlowFixMe
          dataSource={value.map(v => ({key: v.id, ...v}))}
          pagination={false}
        />
      </Toolbar>
    </Modal>
  }
}