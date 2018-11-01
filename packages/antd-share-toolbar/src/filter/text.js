import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Input} from 'antd';
import get from 'lodash/get';
import set from 'lodash/set';

export default class TextFilter extends Component {
  static propTypes = {
    onChange: PropTypes.func,
    name: PropTypes.string,
    label: PropTypes.string
  };

  onInput = e => {
    const {name, onChange} = this.props;
    const {value} = e.target;
    if (!value) {
      onChange({
        [(name || '').split('.')[0]]: undefined
      });
    } else {
      onChange(set({}, `${name}.contains`, value));
    }
  }

  render() {
    const {placeholder, where, name} = this.props;
    return (
      <Input
        style={{width: 'auto'}}
        placeholder={placeholder || name}
        onChange={this.onInput}
        defaultValue={get(where, `${name}.contains`, '')}
      />
    );
  }
}
