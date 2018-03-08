// @flow
import React, { PureComponent } from "react";
import styled from 'styled-components';

type Props = {
  checked: boolean,
  value: string | boolean,
  onChange: (value: string | boolean) => void,
  text: string,
  disabled: boolean
};

const Label = styled.div`
  display: inline-block;
  margin: 10px;
  border: ${props =>
    props.checked ? "2px solid #fc9d6c" : "2px solid transparent"};
  padding: 20px 40px;
  font-size: 50px;
  border-radius: 10px;
  text-align: center;
  &:hover {
    box-shadow: 1px 1px 20px rgba(0, 0, 0, 0.1);
  }
  ${props => {
    if (props.disabled) {
      return {
        backgroundColor: '#f5f5f5',
        color: 'rgba(0, 0, 0, 0.25)',
        cursor: 'not-allowed'
      };
    }
  }};
`;

export default class Card extends PureComponent<Props> {
  onChange = (value: string | boolean) => {
    this.props.onChange(value);
  };

  render() {
    const {
      value,
      checked,
      text,
      disabled
    } = this.props;
    let displayText = text || value;
    if (typeof value === "boolean") {
      displayText = text || (value ? "YES" : "NO");
    }

    return (
      <Label
        checked={checked}
        disabled={disabled}
        onClick={() => this.onChange(value)}
      >
        {displayText}
      </Label>
    );
  }
}
