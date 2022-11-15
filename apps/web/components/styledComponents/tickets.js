import styled from 'styled-components';

export const TicketsView = styled.div`
  padding: 1em;
`;

export const TicketType = styled.div`
  border-radius: 10px;
  height: 220px;
  padding: 0.01em 1em;
  background-color: #4A7CB1;
  color: #BDCFE2;
  user-select: none;
  -webkit-box-shadow: 3px 7px 33px -14px rgba(17,63,112,1);
  -moz-box-shadow: 3px 7px 33px -14px rgba(17,63,112,1);
  box-shadow: 3px 7px 33px -14px rgba(17,63,112,1);
`;

export const TicketTypeText = styled.h2`
  background-color: #f3ec78;
  background-image: linear-gradient(45deg, #C5ECFF, #8BD8FF);
  background-size: 90%;
  -webkit-background-clip: text;
  -moz-background-clip: text;
  -webkit-text-fill-color: transparent; 
  -moz-text-fill-color: transparent;
`

export const StyledAlert = styled.div`
  border-radius: 5px;
  padding: 0.5em;
  font-size: 10px;
  height: 40px;
  width: 100%;
  word-break: break-word;
  margin: 0.5em 0;
  background-color: #244982;
  strong {
    color: #E2761B;
  }
`