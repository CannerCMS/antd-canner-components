import styled from "styled-components";

const Img = styled.img`
  display: block;
  ${props => {
    if (props.imgStyle) {
      return { ...props.imgStyle };
    }
  }};
`;

export default Img;
