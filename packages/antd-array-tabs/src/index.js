// @flow
import React, { Component } from "react";
import Tabs, { TabPane } from "@canner/rc-tabs";
import TabContent from "@canner/rc-tabs/lib/TabContent";
import ScrollableInkTabBar from "@canner/rc-tabs/lib/ScrollableInkTabBar";
import { Button, Icon } from "antd";
import Sortable from "react-sortablejs";
import { List } from "immutable";
import {injectIntl} from 'react-intl';
import 'antd/lib/tabs/style';

// types
import type {ArrayDefaultProps} from 'types/ArrayDefaultProps';
import type {
  FieldItems,
  RenderChildrenFn,
  DeployFn,
  GenerateIdFn,
  CreateEmptyDataFn,
  RoutesArr
} from 'types/DefaultProps';
import type { Node } from "react";
import {intlShape} from 'react-intl';

type Props = ArrayDefaultProps<FieldItems> & {
  uiParams: {
    titleKey?: string,
    titlePrefix?: string,
    position?: "top" | "left" | "right" | "bottom"
  },
  items: FieldItems,
  routes: RoutesArr,
  generateId: GenerateIdFn,
  createEmptyData: CreateEmptyDataFn,
  renderChildren: RenderChildrenFn,
  renderButton: (any) => Node,
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
      id,
      items,
      createEmptyData,
      onChange,
    } = this.props;
    const size = value.size;
    onChange(`${id}`, 'create', createEmptyData(items));
    this.setState({ activeKey: `${size}` });
  };

  handleDelete = (index: number) => {
    const { intl, onChange, deploy, value } = this.props;
    const r = confirm(intl.formatMessage({ id: "array.tab.delete.confirm" }));
    if (r) {
      const { id, generateId } = this.props;
      const deleteId = generateId(id, index, "array");
      onChange(deleteId, "delete")
        .then(() => {
          return deploy(id, value.getIn([index, '_id']));
        })
        .then(() => {
          this.setState({
            activeKey: `${value.size - 1}`
          });
        });
    }
  };

  dragItem = (order: any, sortable: any, evt: any) => {
    const {newIndex, oldIndex} = evt;
    const {id, generateId, onChange} = this.props;

    const prevIndex = generateId(id, oldIndex - 1, "array");
    const currIndex = generateId(id, newIndex - 1, "array");

    this.setState({activeKey: `${newIndex - 1}`});
    onChange({firstId: currIndex, secondId: prevIndex}, "swap")
  };

  render() {
    const {
      value,
      renderChildren,
      generateId,
      id,
      uiParams,
      intl
    } = this.props;
    const { activeKey } = this.state;
    const position = uiParams.position || "top";
    const panelFields = [];

    // set array content
    value.forEach((item, i) => {
      const thisId = generateId(id, i, "array");

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
      const childrenWithProps = renderChildren({
        id: thisId,
        routes: this.props.routes
      }, {
        key: thisId.split('/')[0],
        id: item.get('_id')
      }, {
        id: item.get('_id')
      });

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
        >
          {childrenWithProps}
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