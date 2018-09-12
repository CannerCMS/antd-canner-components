// @flow

import React, { Component } from "react";
import { Button, Icon, Form, Input, Select } from "antd";
import { flatten, map, reduce, isEqual } from "lodash";
import { Option, VariantsContainer, Remove} from './components';

import {injectIntl} from 'react-intl';
import {LiteCMS, createEmptyData} from 'canner-helpers';
import type {ObjectDefaultProps} from 'types/ObjectDefaultProps';

type Props = ObjectDefaultProps & {
  intl: any,
  items: any,
  value: {
    options: Array<any>,
    variants: Array<any>
  }
};

const FormItem = Form.Item;
const defaultData = {
  variants: [],
  options: []
};

@injectIntl
export default class Variants extends Component<Props> {
  static defaultProps = {
    uiParams: {},
    value: defaultData
  };

  updateTag = (val: Array<string>, order: number) => {
    const { value, items, onChange, refId } = this.props;
    const variants = value && value.variants;
    const options = (value && value.options) ? JSON.parse(JSON.stringify(value.options)) : [];
    options[order].values = val;
    const types = this.cartesianProduct(options);
    const variantsObj = types.map(type => {
      const newVariants = type.join("-");
      const originVariants = (variants, []).find(variant =>
        isEqual(variant.options, newVariants)
      );
      if (originVariants) {
        return originVariants;
      }
      return {
        ...createEmptyData(items.variants.items.items),
        options: newVariants
      };
    });
    onChange(
      refId,
      "update",
      {
        options,
        variants: variantsObj
      }
    );
  }

  updateVariantsAfterRemoveOption = (i: number) => {
    const { value, items, refId, onChange } = this.props;
    const options = (value && value.options) ? JSON.parse(JSON.stringify(value.options)) : [];
    options.splice(i, 1);
    const variants = value && value.variants ? value.variants : [];
    const types = this.cartesianProduct(options);
    const variantsObj = types.filter(type => type.length).map(type => {
      const newVariants = type.join("-");
      const originVariants = variants && variants.find(variant =>
        isEqual(variant.options, newVariants)
      );
      if (originVariants) {
        return originVariants;
      }
      return {
        ...createEmptyData(items.variants.items.items),
        options: newVariants
      };
    });
    onChange(
      refId,
      "update",
      {
        options,
        variants: variantsObj
      }
    );
  }

  cartesianProduct = (products: Array<{[string]: any}>) => {
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
    const { refId, items, onChange, value } = this.props;
    onChange(
      refId,
      "update",
      {
        options: ((value && value.options) ? value.variants : []).concat(createEmptyData(items.options.items)),
        variants: value && value.variants || []
      }
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
    const action = Object.keys(items.variants.items.items);
    const options = (value && value.options) ? value.options : [];
    action.splice(action.indexOf("options"), 1);
    return (
      <div>
        {options.map((opt, i) => {
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
                  value={opt.name}
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
                  defaultValue={opt.values}
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
          <LiteCMS
            refId={refId.child('variants')}
          />
        </VariantsContainer>
      </div>
    );
  }
}
