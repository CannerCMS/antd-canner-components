// @flow
import * as React from 'react';
import Variants from 'packages/antd-object-variants';
import cmsLocale from 'packages/antd-locales';
import {Divider} from 'antd';
import {IntlProvider} from 'react-intl';

import ExamplePrimitiveValueWrapper from '../ExamplePrimitiveValueHoc';
import type {PrimitiveTypes} from '../types';
import RefId from 'canner-ref-id';

@ExamplePrimitiveValueWrapper({
	options: [{
		name: 'size',
		values: ['M', 'S']
	}, {
		name: 'color',
		values: ['red']
	}],
	variants: [{
		options: 'M-red',
    title: "This is M-red",
    desc: "This is M-red content"
	}, {
		options: 'S-red',
    title: "This is S-red",
    desc: "This is S-red content"
	}]
})
class VariantsDemo1 extends React.Component<PrimitiveTypes<boolean>> {
  render() {
    const {value, onChange} = this.props;
    const items = {
      options: {
        type: "array",
        items: {
          type: "object",
          items: {
            name: {
              type: "string",
              keyName: "name"
            },
            values: {
              type: "array",
              items: {
                type: "string",
                keyName: "value"
              }
            }
          }
        }
      },
      variants: {
        type: "array",
        items: {
          type: "object",
          items: {
            title: {
              type: "string",
              keyName: "title"
            },
            desc: {
              keyName: "desc",
              type: "string",
              ui: "editor"
            }
          }
        }
      }
    };

    return (
      <IntlProvider
        locale="en"
        messages={cmsLocale["en"]}>
        <React.Fragment>
          <Divider>Variants</Divider>
          <Variants
            refId={new RefId("variants")}
            value={value}
            items={items}
            onChange={onChange}
            />
        </React.Fragment>
      </IntlProvider>
    );
  }
}

export default class Demo extends React.Component<{}> {
  render() {
    return (
      <React.Fragment>
        <VariantsDemo1/>
      </React.Fragment>
    )
  }
}