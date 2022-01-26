import styled from '@emotion/styled';

export const ControlsWrapper = styled.div`
    background-color: white;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    border: 2px solid black;
    position: relative;
    height: 100%;
`;

export const ControlsBody = styled.div`
    height: calc(100% - 56px);
    overflow-y: auto;
`;

export const PanelFooter = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: #dededd;
    border-top: 2px solid #000;
    padding: 11px;
    div {
    flex-grow: 1;
    }
    * > button {
    margin-right: 10px;
    &:last-of-type {
        margin: 0;
    }
    }
    @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
    button {
        width: 100%;
        margin: 0 0 14px 0;
    }
    }
`;

export const LineContent = styled.div`
    width: 100%;
    height: 47px;
    display: flex;
    border-bottom: 1px solid #dededd;
`;

export const LineKey = styled.div`
    padding: 16px;
    width: 136px;
`;

export const LineValue = styled.div`
    padding: 16px;
    width: 100%;
`;