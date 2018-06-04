// @flow
import React, { PureComponent } from "react";
import InputString from "@canner/antd-string-input";
import defaultMessage from "@canner/antd-locales";
import { FormattedMessage } from "react-intl";
import styled from 'styled-components';

// types
import type {StringDefaultProps} from 'types/StringDefaultProps';

type Props = StringDefaultProps

const PreviewContainer = styled.div`
  margin: 10px 0;
`

export default class LinkString extends PureComponent<Props> {
  render() {
    const { value, onChange, refId, disabled } = this.props;
    return (
      <div>
        <InputString refId={refId} value={value} onChange={onChange} disabled={disabled}/>
        {value && (
          <PreviewContainer>
            <FormattedMessage
              id="string.link.preview"
              defaultMessage={defaultMessage.en["string.link.preview"]}
            />
            <a href={value} target="_blank">
              {value}
            </a>
          </PreviewContainer>
        )}
      </div>
    );
  }
}
