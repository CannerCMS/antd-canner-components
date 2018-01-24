// @flow

import React, { Component } from "react";
import { Button, Icon } from "antd";
import { popup as Popup } from "@canner/cms-plugin-array-popup";
import { Form, Input, Select } from "antd";
import { flatten, map, reduce, isEqual } from "lodash";
import { fromJS, List } from "immutable";
import CSSModules from "react-css-modules";
import styles from "./style/variants.scss";
import {injectIntl} from 'react-intl';
const FormItem = Form.Item;
const defaultData = fromJS({
  variants: [],
  options: []
});

type Props = defaultProps & {
  intl: any
};
@injectIntl
@CSSModules(styles)
export default class Variants extends Component<Props> {
  static defaultProps = {
    uiParams: {},
    value: defaultData
  };

  updateTag = (val: List<string>, order: number) => {
    const { value, items, createEmptyData, id, onChange } = this.props;
    const variants = value.get("variants");
    const options = value
      .get("options")
      .setIn([order, "values"], List(val));
    const types = this.cartesianProduct(options.toJS());
    const variantsObj = types.map(type => {
      const newVariants = type.join("-");
      const originVariants = variants.find(variant =>
        isEqual(variant.get("options"), newVariants)
      );
      if (originVariants) {
        return originVariants;
      }
      return {
        ...createEmptyData(items.variants.items.items).toJS(),
        options: newVariants
      };
    });
    onChange(
      id,
      "update",
      fromJS({
        options,
        variants: variantsObj
      })
    );
  }

  cartesianProduct = (products: Array<{[string]: any}>) => {
    // IMPROVEMENT: need to refactor to pure immutable
    const values = products.map(prod => prod.values);
    const cartesian = reduce(
      values,
      (a, b) => {
        return flatten(
          map(a, x => {
            return map(b, y => {
              return x.concat([y]);
            });
          }),
          true
        );
      },
      [[]]
    );

    return cartesian;
  }

  addOptions = () => {
    const { id, items, createEmptyData, onChange } = this.props;
    onChange(
      `${id}/options`,
      "create",
      createEmptyData(items.options.items)
    );
  }

  removeOption = (i: number) => {
    const { id, onChange } = this.props;
    onChange(`${id}/options/${i}`, "delete");
  }

  changeOptionName = (i: number, e: any) => {
    const { id, onChange } = this.props;
    onChange(`${id}/options/${i}/name`, "update", e.target.value);
  }

  render() {
    const { value, items, uiParams, id, intl } = this.props;
    let { columns } = uiParams;
    columns = columns || [];
    columns = [
      {
        title: intl.formatMessage({ id: "object.variants.table.title" }),
        dataIndex: "options",
        key: "options"
      }
    ].concat(columns);
    const action = Object.keys(items.variants.items.items);
    action.splice(action.indexOf("options"), 1);
    return (
      <div>
        {value.get("options").map((opt, i) => {
          return (
            <div key={i} styleName="opt">
              <Icon
                type="close-circle"
                styleName="remove"
                onClick={() => this.removeOption(i)}
              />
              <FormItem
                label={intl.formatMessage({
                  id: "object.variants.variantsName"
                })}
              >
                <Input
                  value={opt.get("name")}
                  onChange={e => this.changeOptionName(i, e)}
                />
              </FormItem>
              <FormItem
                label={intl.formatMessage({ id: "object.variants.select" })}
              >
                <Select
                  mode="tags"
                  size="large"
                  style={{ width: "100%" }}
                  tokenSeparators={[","]}
                  defaultValue={opt.get("values") && opt.get("values").toJS()}
                  placeholder={intl.formatMessage({
                    id: "object.variants.select.placeholder"
                  })}
                  onChange={val => this.updateTag(val, i)}
                />
              </FormItem>
            </div>
          );
        })}

        <Button type="dashed" onClick={() => this.addOptions()} styleName="add">
          <Icon type="plus-circle" />
          {intl.formatMessage({ id: "object.variants.addVariants" })}
        </Button>
        <div styleName="variants">
          <Popup
            {...this.props}
            schema={items.variants.items}
            uiParams={{
              createAction: [],
              updateAction: action,
              deleteAction: false,
              columns
            }}
            id={`${id}/variants`}
            value={value.get("variants")}
          />
        </div>
      </div>
    );
  }
}
