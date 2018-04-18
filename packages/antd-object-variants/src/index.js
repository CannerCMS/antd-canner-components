// @flow

import React, { Component } from "react";
import { Button, Icon, Form, Input, Select } from "antd";
import { flatten, map, reduce, isEqual } from "lodash";
import { Option, VariantsContainer, Remove} from './components';

import {injectIntl} from 'react-intl';
import {Item, createEmptyData, transformData} from '@canner/react-cms-helpers';
import type {List} from 'immutable';
import type {ObjectDefaultProps} from 'types/ObjectDefaultProps';

type Props = ObjectDefaultProps & {
  intl: any,
  items: any
};

const FormItem = Form.Item;
const defaultData = transformData({
  variants: [],
  options: []
});

@injectIntl
export default class Variants extends Component<Props> {
  static defaultProps = {
    uiParams: {},
    value: defaultData
  };

  updateTag = (val: List<string>, order: number) => {
    const { value, items, onChange, refId } = this.props;
    const variants = value.get("variants");
    const options = value
      .get("options", transformData([]))
      .setIn([order, "values"], transformData(val));
    const types = this.cartesianProduct(options.toJS());
    const variantsObj = types.map(type => {
      const newVariants = type.join("-");
      const originVariants = (variants, []).find(variant =>
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
      refId.child(order),
      "update",
      transformData({
        options,
        variants: variantsObj
      })
    );
  }

  updateVariantsAfterRemoveOption = (i: number) => {
    const { value, items, refId, onChange } = this.props;
    const options = value.get("options", transformData([])).remove(i);
    const variants = value.get("variants");
    const types = this.cartesianProduct(options.toJS());
    const variantsObj = types.filter(type => type.length).map(type => {
      const newVariants = type.join("-");
      const originVariants = variants && variants.find(variant =>
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
      refId,
      "update",
      transformData({
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
            return b && b.length ? map(b, y => {
              return x.concat([y]);
            }) : [x];
          }),
          true
        );
      },
      [[]]
    );

    return cartesian;
  }

  addOptions = () => {
    const { refId, items, onChange } = this.props;
    onChange(
      refId.child('options'),
      "create",
      createEmptyData(items.options.items)
    );
  }

  removeOption = (i: number) => {
    this.updateVariantsAfterRemoveOption(i);
  }

  changeOptionName = (i: number, e: any) => {
    const { refId, onChange } = this.props;
    onChange(refId.child(`options/${i}/name`), "update", e.target.value);
  }

  render() {
    
    const { value, items, refId, intl } = this.props;
    // for now, use panel instead of popup to quick fix
    // let { columns } = uiParams;
    // columns = columns || [];
    // columns = [
    //   {
    //     title: intl.formatMessage({ id: "object.variants.table.title" }),
    //     dataIndex: "options",
    //     key: "options"
    //   }
    // ].concat(columns);
    const action = Object.keys(items.variants.items.items);
    
    action.splice(action.indexOf("options"), 1);
    return (
      <div>
        {value.get("options", []).map((opt, i) => {
          return (
            <Option key={i}>
              <Remove>
                <Icon
                  type="close-circle"
                  onClick={() => this.removeOption(i)}
                />
              </Remove>
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
            </Option>
          );
        })}

        <Button
          type="dashed"
          onClick={() => this.addOptions()}
          style={{width: '100%', textAlign: 'center'}}>
          <Icon type="plus-circle" />
          {intl.formatMessage({ id: "object.variants.addVariants" })}
        </Button>
        <VariantsContainer>
          <Item
            refId={refId.child('options')}
          />
        </VariantsContainer>
      </div>
    );
  }
}
