import { css } from "@emotion/react";

interface IconProps {
  icon: string,
  label: string,
  clickAction: () => void
};

export default ({ icon, label, clickAction }: IconProps) => {

  return (
    <div className="desktop-icon"
      css={css`
        display: flex;
        align-item: center;
        justify-content: center;
        flex-direction: column;
        cursor: pointer;
        cursor: hand;
        margin: 2.5vh 5vw;
        width: 128px;
      `}
    >
      <div className="desktop-icon-image"
        css={css`
          align-self: center;
          display: flex;
          width: 64px;
          height: 64px;
          justify-content: center;
          align-items: center;
          margin-bottom: 8px;
          img {
            display: block;
            width: 100%;
            height: 100%;
          }
      `}
      >
        <img 
          src={ `/images/icon/${icon}.svg` } 
          alt={ icon } 
          onClick={ () => clickAction() } 
        />
      </div>
      <div className="desktop-icon-label"
        css={css`
          align-self: center;
          font-size: 12px;
          padding: 8px;
          background-color: #000;
          color: #fff;
          text-align: center;
        `}
      >
        { label }
      </div>
    </div>
  );

};