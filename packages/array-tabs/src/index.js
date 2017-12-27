// @flow

import React, { Component } from "react";
import Tabs, { TabPane } from "@canner/rc-tabs";
import TabContent from "@canner/rc-tabs/lib/TabContent";
import ScrollableInkTabBar from "@canner/rc-tabs/lib/ScrollableInkTabBar";
import { Button, Icon } from "antd";
import type { List } from "immtable";
import CSSModules from "react-css-modules";
import styles from "./style/tab.scss";
import "./style/index.lib.scss";

type Props = defaultProps & {
  value: List<any>,
  uiParams: {
    titleKey?: string,
    titlePrefix?: string,
    position?: "top" | "left" | "right" | "bottom"
  },
  allowSwap: boolean
};

type State = {
  activeKey: number
};

@CSSModules(styles)
export default class TabUi extends Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = {
      activeKey: 0
    };
  }

  componentWillReceiveProps(nextProps: Props) {
    // change active key when user delete last tab
    let { activeKey } = this.state;
    const valueSize = nextProps.value.size;
    if (valueSize < Number(activeKey, 10) + 1) {
      activeKey = valueSize - 1;
      this.setState({ activeKey });
    }
  }

  handleTabChange = (key: string) => {
    this.setState({ activeKey: key });
  };

  handleCreate = () => {
    const {
      value,
      id,
      items,
      generateId,
      createEmptyData,
      onChange
    } = this.props;
    const size = value.size;
    const createId = generateId(id, size, "array");
    onChange(createId, "create", createEmptyData(items));
    this.setState({ activeKey: size });
  };

  handleDelete = () => {
    const { intl, onChange } = this.props;
    const r = confirm(intl.formatMessage({ id: "array.tab.delete.confirm" }));
    if (r) {
      let { activeKey } = this.state;
      const { id, generateId } = this.props;
      const deleteId = generateId(id, activeKey, "array");
      onChange(deleteId, "delete");
    }
  };

  dragStart = (e: any, data: any) => {
    const grandParentNode = data.node.parentNode.parentNode;
    const parentNode = data.node.parentNode;
    const nodeList = Array.prototype.slice.call(grandParentNode.children);
    const index = nodeList.indexOf(parentNode);
    this.prevIndex = index;
  };

  dragStop = (e: any, data: any) => {
    const grandParentNode = data.node.parentNode.parentNode;
    const parentNode = data.node.parentNode;
    const { id, generateId } = this.props;
    const nodeList = Array.prototype.slice.call(grandParentNode.children);
    const index = nodeList.indexOf(parentNode);

    const currActiveKey = index - 1;
    const prevIndex = generateId(id, this.prevIndex - 1, "array");
    const currIndex = generateId(id, currActiveKey, "array");

    this.setState({ activeKey: `${currActiveKey}` });
    this.props.onChange({ firstId: currIndex, secondId: prevIndex }, "swap");
  };

  render() {
    const {
      value,
      renderChildren,
      generateId,
      id,
      uiParams,
      allowSwap,
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

      const deleteBtn = (
        <Icon type="close-circle" onClick={this.handleDelete} />
      );
      const childrenWithProps = renderChildren({
        id: thisId,
        value: value.get(i)
      });
      panelFields.push(
        <TabPane
          tab={Number(activeKey, 10) === i ? [title, deleteBtn] : title}
          id={thisId}
          key={i}
        >
          {childrenWithProps}
        </TabPane>
      );
    });

    return (
      <div styleName="tab-container">
        <Tabs
          drag={allowSwap}
          updateChildren
          activeKey={`${activeKey}`}
          tabBarPosition={position}
          renderTabBar={() => (
            <ScrollableInkTabBar
              extraContent={
                <Button type="default" onClick={this.handleCreate}>
                  +
                </Button>
              }
              onTabClick={this.onTabClick}
            />
          )}
          renderTabContent={() => (
            <TabContent tabBarPosition={position} animated={false} />
          )}
          onChange={this.handleTabChange}
          dragStart={this.dragStart}
          dragStop={this.dragStop}
        >
          {panelFields}
        </Tabs>
      </div>
    );
  }
}
