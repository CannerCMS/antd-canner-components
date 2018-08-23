// @flow
import * as React from 'react';
import styled from 'styled-components';

// type
import type {IndicatorDefaultProps} from 'types/IndicatorDefaultProps';

type Props = IndicatorDefaultProps & {
  uiParams: {
    title: string,
    formatter: (value: any) => string
  }
};

const Wrapper = styled.div``;

const Title = styled.div`
  color: rgba(0,0,0,0.54);
  font-size: 18px;
  white-space: nowrap;
`;

const Amount = styled.div`
  color: rgba(0,0,0,0.87);
  font-size: 26px;
`;

const IndicatorAmount = ({ value, uiParams: { title, formatter } }: Props) => {
  return (
    <Wrapper>
      <Title>{ title }</Title>
      <Amount>{ formatter(value) }</Amount>
    </Wrapper>
  );
}

export default IndicatorAmount;
