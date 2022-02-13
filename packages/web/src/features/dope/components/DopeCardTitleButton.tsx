import styled from "@emotion/styled";

const DopeCardTitleButton = styled.div`
  width: 96px;
  height: 100%;
  padding: 0 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #202221;
  border-left: 1px solid #000;
  color: #fff;
  box-shadow: -1px -1px 0px rgba(0, 0, 0, 0.25) inset,
    1px 1px 0px rgba(255, 255, 255, 0.25) inset;
  border-top-right-radius: 4px;
  a {
    width: 100%;
    text-align: center;
    // truncate long prices
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    // to center image
    display: flex;
    justify-content: center;
  }
`

export default DopeCardTitleButton;