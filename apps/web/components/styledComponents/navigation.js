import styled from 'styled-components';

export const Balance = styled.div`
  display: inline-block;
  margin-left: 1em;
`

export const RightNav = styled.div`
  margin-left: auto;
  width: ${props => (props.widthPixel += "px") || "100%"};
`