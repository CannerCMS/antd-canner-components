// @flow
import * as React from 'react';
import styled from 'styled-components';

// type
import type {IndicatorDefaultProps} from 'types/IndicatorDefaultProps';

type Props = IndicatorDefaultProps & {
  title: string,
  uiParams: {
    formatter: (value: any) => string,
    note: (value: any) => string | string
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

const Note = styled.div`
  color: rgba(0,0,0,0.30);
  font-size: 12px;
`

const IndicatorAmount = ({ value, title, uiParams: { formatter = v => v, note } }: Props) => {
  return (
    <Wrapper>
      <Title>{ title }</Title>
      <Amount>{ formatter(value) }</Amount>
      <Note>{ typeof note === "function" ? note(value) : note }</Note>
    </Wrapper>
  );
}

export default IndicatorAmount;
