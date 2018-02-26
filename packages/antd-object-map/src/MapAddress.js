// @flow

import React, { Component } from "react";
import { Form, Input, Button } from "antd";
const FormItem = Form.Item;
import {injectIntl} from 'react-intl';

function hasErrors(fieldsError) {
  return Object.keys(fieldsError).some(field => fieldsError[field]);
}

type Props = {
  lat: number,
  lng: number,
  onChange: Function,
  intl: any,
  form: {
    getFieldDecorator: Function,
    isFieldTouched: Function,
    getFieldError: Function,
    getFieldsError: Function,
    validateFields: Function
  }
}

@injectIntl
@Form.create()
export default class MapAddress extends Component<Props> {
  handleSubmit = (e: any) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const { lat, lng } = values;
        this.getAddress(lat, lng).then(address => {
          this.props.onChange({ address, lat: +lat, lng: +lng });
        });
      }
    });
  }

  getAddress(lat: number, lng: number) {
    const latlng = lat + "," + lng;
    return fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latlng}`
    )
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        throw new Error("get address error");
      })
      .then(res => {
        const address = res.results[0].formatted_address;
        return address;
      })
      .catch(err => {
        // eslint-disable-next-line
        console.error(err);
      });
  }

  render() {
    const { lat, lng, intl } = this.props;
    const {
      getFieldDecorator,
      isFieldTouched,
      getFieldError,
      getFieldsError
    } = this.props.form;
    const latError = isFieldTouched("lat") && getFieldError("lat");
    const lngError = isFieldTouched("lng") && getFieldError("lng");
    const latText = intl.formatMessage({id: "object.map.address.latText"});
    const lngText = intl.formatMessage({id: "object.map.address.lngText"});
    const sureText = intl.formatMessage({id: "object.map.address.sureText"});
    return (
      <div>
        <Form layout="inline" onSubmit={this.handleSubmit}>
          <FormItem
            validateStatus={latError ? "error" : ""}
            help={latError || ""}
          >
            {getFieldDecorator("lat", {
              rules: [{ required: true, message: "Please enter lat!" }],
              initialValue: lat
            })(<Input className="geosuggest__input" placeholder={latText} />)}
          </FormItem>
          <FormItem
            validateStatus={lngError ? "error" : ""}
            help={lngError || ""}
          >
            {getFieldDecorator("lng", {
              rules: [{ required: true, message: "Please enter lng!" }],
              initialValue: lng
            })(<Input className="geosuggest__input" placeholder={lngText} />)}
          </FormItem>
          <FormItem>
            <Button
              type="primary"
              htmlType="submit"
              disabled={hasErrors(getFieldsError())}
            >
              {sureText}
            </Button>
          </FormItem>
        </Form>
      </div>
    );
  }
}