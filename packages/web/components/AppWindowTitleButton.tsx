import { css } from "@emotion/react";

interface IconProps {
  icon: string,
  clickAction: () => void
};

export default ({ icon, clickAction }: IconProps) => {

  return (
    <div css={css`
      background-color: #D0D0D0;
      box-shadow: -1px -1px 0px rgba(0,0,0,.25) inset, 
      1px 1px 0px rgba(255,255,255,.25) inset;
      display: inline-block;
      width: 32px;
      height: 32px;
      border-right: 2px solid #000;
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
      cursor: hand;
      img {
        display: block;
        width: 16px;
        height: 16px;
      }
    `}
    >
      <img 
        src={ `/images/icon/${icon}.svg` } 
        alt={ icon } 
        onClick={ () => clickAction() } 
      />
    </div>
  );

};