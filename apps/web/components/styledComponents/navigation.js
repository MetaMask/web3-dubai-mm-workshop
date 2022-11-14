import styled from 'styled-components';

export const NavigationView = styled.div`
  padding: 1em;
  border-bottom: 1px solid #FFF;
  background-color: #265C8E;
  color: #FFF;
`;

export const Logo = styled.div`
  display: block;
  display: inline-block;
  line-height: 36px;
  height: 36px;
`

export const Balance = styled.div`
  display: inline-block;
  margin-left: 1em;
`

export const RightNav = styled.div`
  margin-left: auto;
  line-height: 36px;
  height: 36px;
  width: ${props => (props.widthPixel += "px") || "100%"};
`