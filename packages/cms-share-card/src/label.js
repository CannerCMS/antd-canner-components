import styled from "styled-components";

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
    if (props.labelStyle) {
      return { ...props.labelStyle };
    }
  }};
`;

export default Label;
