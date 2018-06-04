// @flow
import React, { Component } from "react";
import Tabs, { TabPane } from "@canner/rc-tabs";
import TabContent from "@canner/rc-tabs/lib/TabContent";
import ScrollableInkTabBar from "@canner/rc-tabs/lib/ScrollableInkTabBar";
import { Button, Icon, Modal } from "antd";
import Sortable from "react-sortablejs";
import { List } from "immutable";
import {injectIntl} from 'react-intl';
import {Item, ConfirmButton, ResetButton} from 'canner-helpers';
import 'antd/lib/tabs/style';

// types
import type {ArrayDefaultProps} from 'types/ArrayDefaultProps';
import type {
  FieldItems,
  DeployFn
} from 'types/DefaultProps';
import {intlShape} from 'react-intl';

const {confirm} = Modal;

type Props = ArrayDefaultProps<FieldItems> & {
  uiParams: {
    titleKey?: string,
    titlePrefix?: string,
    position?: "top" | "left" | "right" | "bottom"
  },
  deploy: DeployFn,
  intl: intlShape
};

type State = {
  activeKey: string
};

@injectIntl
export default class TabUi extends Component<Props, State> {
  prevIndex: number;
  constructor(props: Props) {
    super(props);
    this.state = {
      activeKey: '0',
    };
  }

  componentWillReceiveProps(nextProps: Props) {
    // change active key when user delete last tab
    let { activeKey } = this.state;
    const valueSize = nextProps.value.size;
    if (valueSize < Number(activeKey) + 1) {
      activeKey = valueSize - 1;
      this.setState({ activeKey: String(activeKey) });
    }
  }

  static defaultProps = {
    uiParams: {},
    value: new List()
  };

  handleTabChange = (key: string) => {
    this.setState({ activeKey: key });
  };

  handleCreate = () => {
    const {
      value,
      refId,
      onChange,
    } = this.props;
    const size = value.size;
    onChange(refId, 'create');
    this.setState({ activeKey: `${size}` });
  };

  handleDelete = (index: number) => {
    const { intl, onChange, deploy, value, refId } = this.props;
    const that = this;
    confirm({
      title: intl.formatMessage({ id: "array.tab.delete.confirm" }),
      onOk() {
        onChange(refId.child(index), "delete")
          .then(() => {
            if (deploy) {
              return deploy(refId);
            }

            return Promise.resolve();
          })
          .then(() => {
            that.setState({
              activeKey: `${value.size - 2}`
            });
          });
      }
    })
  };

  dragItem = (order: any, sortable: any, evt: any) => {
    const {newIndex, oldIndex} = evt;
    const {refId, onChange} = this.props;

    const prevRefId = refId.child(oldIndex - 1);
    const currRefId = refId.child(newIndex - 1);

    this.setState({activeKey: `${newIndex - 1}`});
    onChange({firstRefId: prevRefId, secondRefId: currRefId}, "swap")
  };

  render() {
    const {
      value,
      refId,
      uiParams,
      intl
    } = this.props;
    const { activeKey } = this.state;
    const position = uiParams.position || "top";
    const panelFields = [];

    // set array content
    value.forEach((item, i) => {
      const thisId = refId.child(i);

      // generate panel title
      let title;
      const defaultTitle = `${intl.formatMessage({
        id: "array.tab.item"
      })} ${i + 1}`;

      if (uiParams.titleKey) {
        title = item.get(uiParams.titleKey) || defaultTitle;
      } else if (uiParams.titlePrefix) {
        title = `${uiParams.titlePrefix}${i + 1}` || defaultTitle;
      } else {
        title = defaultTitle;
      }

      const deleteBtn = (index: number) => (
        <Icon type="close-circle" onClick={() => this.handleDelete(index)} />
      );

      if (position === 'right' && activeKey === `${i}`) {
        title = [title, ' ', deleteBtn(i)];
      } else if (activeKey === `${i}`) {
        title = [deleteBtn(i), ' ', title];
      }

      panelFields.push(
        <TabPane
          tab={title}
          id={thisId}
          key={`${i}`}
          style={{
            overflow: 'hidden',
            padding: '0 10px'
          }}
        >
          <Item
            refId={thisId}
          />
          <div>
            <ConfirmButton refId={thisId}/>
            <ResetButton refId={thisId}/>
          </div>
        </TabPane>
      );
    });
    
    return (
      <div style={{width: '100%'}}>
        <Tabs
          prefixCls='ant-tabs'
          className={position === 'left' || position === 'right' ? 'ant-tabs-vertical' : null}
          activeKey={`${activeKey}`}
          tabBarPosition={position}
          navWrapper={(content) => (
            <Sortable onChange={this.dragItem}>
              {content}
            </Sortable>
          )}
          renderTabBar={() => (
            <ScrollableInkTabBar
              extraContent={
                <Button style={{margin: '6px'}}onClick={this.handleCreate}>+ Add</Button>
              }
              />
          )}
          renderTabContent={() => (
            <TabContent tabBarPosition={position} animated={false} />
          )}
          onChange={this.handleTabChange}
        >
          {panelFields}
        </Tabs>
      </div>
    );
  }
}