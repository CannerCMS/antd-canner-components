// @flow
import * as React from 'react';
import {Modal, Table} from 'antd';
import type {FieldId} from 'types/DefaultProps';
import {isEqual, get} from 'lodash';
import SyncToolbar from '@canner/antd-share-toolbar';

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
  showPagination: boolean,
  subscribe: Function,
  rootValue: Object,
  Toolbar: React.ComponentType<*>
};

type State = {
  totalValue: Array<*>,
  selectedRowKeys: Array<string>
};

export default class Picker extends React.PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      totalValue: [],
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
      totalValue
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
    const { visible, columns, pickOne = false,
      Toolbar, toolbar, rootValue, refId,
      items, keyName, request, deploy
    } = this.props;
    const { selectedRowKeys} = this.state;
    const recordValue = get(rootValue, refId.remove().getPathArr());
    if (toolbar && toolbar.actions) {
      // not support export import in relation
      delete toolbar.actions.export;
      delete toolbar.actions.import;
    }
    return <Modal
      width={800}
      onOk={this.handleOk}
      onCancel={this.handleCancel}
      visible={visible}
    >
      <Toolbar>
        {
          dataSource => (
            <SyncToolbar
              dataSource={dataSource}
              toolbar={toolbar}
              recordValue={recordValue}
              selectedValue={[]}
              items={items}
              keyName={keyName}
              request={request}
              deploy={deploy}
            >
              {
                ({value, showPagination}) => (
                  <Table
                    style={{marginBottom: 16}}
                    rowSelection={{
                      type: (pickOne) ? "radio" : "checkbox",
                      onChange: this.rowSelectOnChange,
                      selectedRowKeys: selectedRowKeys
                    }}
                    size="small"
                    columns={columns}
                    // $FlowFixMe
                    dataSource={value.map(v => ({...v, key: v.id}))}
                    pagination={showPagination}
                  />
                )
              }
            </SyncToolbar>
          )
        }
      </Toolbar>
    </Modal>
  }
}