// @flow
import React, { PureComponent } from "react";
import { Button, Icon } from "antd";
import {injectIntl} from 'react-intl';
import {List} from 'immutable';
import Collapse from "@canner/rc-collapse";
const Panel = Collapse.Panel;
import "./style/panel.antd.scss";
import "./style/panel.lib.scss";

type State = {
  activeKey: string
};

type Props = defaultProps & {
  value: List<any>,
  uiParams: {
    titleKey: string
  },
  intl: any,
  allowSwap: boolean
};

@injectIntl
export default class PanelUi extends PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      activeKey: ''
    };
  }

  static defaultProps = {
    allowSwap: true,
    uiParams: {},
    value: new List()
  };

  create = () => {
    const { value, id, items, createEmptyData } = this.props;
    const size = value.size;
    this.props.onChange(id, "create", createEmptyData(items.items));
    this.setState({ activeKey: size });
  }

  delete = (id: string) => {
    const { intl } = this.props;
    const r = confirm(intl.formatMessage({ id: "array.panel.delete.confirm" }));
    if (r) {
      this.props.onChange(id, "delete");
    }
  }

  switchTab = (id: string) => {
    this.setState({ activeKey: id });
  }

  onSwap = (fromIndex: number, toIndex: number) => {
    const { id, generateId, onChange } = this.props;
    const fromId = generateId(id, fromIndex, "array");
    const toId = generateId(id, toIndex, "array");

    onChange({ firstId: toId, secondId: fromId }, "swap");
  }

  render() {
    const { activeKey } = this.state;

    const {
      value,
      uiParams,
      id,
      generateId,
      allowSwap,
      intl,
      renderChildren
    } = this.props;
    const titleKey = uiParams.titleKey;
    return (
      <div className="react-qa-plugin-panel">
        {value.size ? (
          <Collapse
            drag={allowSwap}
            accordion
            value={value.toJS()}
            onChange={id => this.switchTab(id)}
            onSwap={this.onSwap}
          >
            {value.map((category, i) => {
              const thisId = generateId(id, i, "array");
              const header = (
                <span>
                  <h3 style={{ display: "inline-block" }}>
                    {category.get(titleKey) ||
                      `${intl.formatMessage({ id: "array.panel.item" })} ${i +
                        1}`}
                    {activeKey === thisId ? (
                      <Icon
                        type="close-circle"
                        onClick={() => this.delete(thisId)}
                      />
                    ) : null}
                  </h3>
                </span>
              );
              return (
                <Panel header={header} key={thisId}>
                  {renderChildren({
                    id: thisId
                  })}
                </Panel>
              );
            })}
          </Collapse>
        ) : null}
        <Button type="primary" onClick={this.create}>
          ＋
        </Button>
      </div>
    );
  }
}