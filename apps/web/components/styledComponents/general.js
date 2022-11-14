import styled from 'styled-components';

export const FlexContainer = styled.div`
  display: flex;
  align-self: flex-end;
  flex-direction: row;
  min-width: calc(100vw -2em);
  gap: ${props => props.gap || 0}em;
  row-gap: ${props => props.gap || 0}em;
`;

export const FlexItem = styled.div`
  width: ${props => props.widthPercent || 50}%;
`;

export const Button = styled.div`
  border-radius: 4px;
  background-color: #103164;
  color: #FFF;
  font-size: ${props => props.textSize || 16}px;
  text-transform: uppercase;
  padding: 1em 0.75em;
  cursor: pointer;
  display: inline-block;
  margin: 0 1em 0 0;
  cursor: pointer;
  &:hover {
    background-color: #295496;
  }
`