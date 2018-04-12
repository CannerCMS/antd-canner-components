// @flow
import React, { PureComponent } from "react";
import { Button, Icon, Collapse, Modal } from "antd";
import {injectIntl, intlShape} from 'react-intl';
import {List} from 'immutable';
import {Item, ConfirmButton, ResetButton} from '@canner/react-cms-helpers';
import type {ArrayDefaultProps} from 'types/ArrayDefaultProps';
import type {
  FieldItems,
  DeployFn
} from 'types/DefaultProps';
const Panel = Collapse.Panel;
const {confirm} = Modal;

type State = {
  activeKey: string
};

type Props = ArrayDefaultProps<FieldItems> & {
  uiParams: {
    titleKey: string
  },
  intl: intlShape,
  deploy: DeployFn
};

@injectIntl
export default class PanelUi extends PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      activeKey: "0"
    };
  }

  static defaultProps = {
    uiParams: {},
    value: new List()
  };

  onChange = (key: string) => {
    this.setState({ activeKey: key });
  };

  onCreate = () => {
    const { value, refId, onChange } = this.props;
    const size = value.size;
    onChange(refId, "create");
    this.setState({ activeKey: `${size}` });
  }

  onDelete = (index: number) => {
    const { intl, onChange, refId, deploy, value } = this.props;

    confirm({
      title: intl.formatMessage({ id: "array.panel.delete.confirm" }),
      onOk() {
        onChange(refId.child(index), "delete")
          .then(() => {
            if (deploy) {
              return deploy(refId);
            }

            return Promise.resolve();
          })
          .then(() => {
            this.setState({
              activeKey: `${value.size - 1}`
            });
          });
      }
    });
  }

  render() {
    const {
      value,
      uiParams,
      refId,
      intl
    } = this.props;
    const { activeKey } = this.state;
    return (
      <div>
        {value.size ? (
          <Collapse
            accordion
            activeKey={activeKey}
            onChange={this.onChange}
          >
            {value.map((item, i) => {
              const thisId = refId.child(i);
              let title;
              const defaultTitle = `${intl.formatMessage({
                id: "array.tab.item"
              })} ${i + 1}`;

              if (uiParams.titleKey) {
                title = item.get(uiParams.titleKey) || defaultTitle;
              } else {
                title = defaultTitle;
              }
              
              const header = (
                <span>
                  {title + ' '}
                  {activeKey === `${i}` ? (
                    <Icon
                      type="close-circle"
                      onClick={() => this.onDelete(thisId)}
                    />
                  ) : null}
                </span>
              );
              return (
                <Panel header={header} key={i}>
                  <Item
                    refId={thisId}
                  />
                  <div>
                    <ConfirmButton refId={thisId}/>
                    <ResetButton refId={thisId}/>
                  </div>
                </Panel>
              );
            })}
          </Collapse>
        ) : null}
        <Button type="primary" onClick={this.onCreate} style={{marginTop: '10px'}}>
          ＋
        </Button>
      </div>
    );
  }
}