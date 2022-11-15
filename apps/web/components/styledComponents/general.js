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

export const Button = styled.button`
  border-radius: 4px;
  border: none;
  background-color: #103164;
  color: #FFF;
  font-size: ${props => props.textSize || 16}px;
  text-transform: uppercase;
  padding: 1em 0.75em;
  display: inline-block;
  margin: 0 1em 0 0;
  cursor: pointer;
  cursor: hand;
  user-select: none;
  &:hover {
    background-color: #244982;
  }
  &:disabled {
    background-color: #244982;
    color: #7697C8;
    cursor: not-allowed;
  }
`