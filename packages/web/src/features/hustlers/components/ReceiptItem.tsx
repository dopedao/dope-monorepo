import styled from "@emotion/styled"

export const ReceiptItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px;
  border-bottom: 2px solid var(--gray-00);
  div:first-child {
    width: 32px;
    height: 32px;
    margin-right:8px;
  }
`

export const DopeLofi = styled.div`
  width: 32px;
  height: 32px;
  background-color: #000000;
  border: 2px solid black;
  border-radius: 4px;
  padding: 2px;
  overflow: hidden;
  font-size: 0.5em;
  line-height: 1em;
  color: white;
`;
