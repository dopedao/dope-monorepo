
import { css } from '@emotion/react';

const iconPath = '/images/icon';

const PreviewHustler = ({}) => (
  <button
        css={css`
          width: 100%;
          color: #fff;
          display: flex;
          padding: 6px;
          align-items: center;
          justify-content: center;
          background-color: #434345;
          border-bottom: 2px solid #000;
          border-right: 2px solid #000;
          border-left: 2px solid #000;
          border-bottom-right-radius: 4px;
          border-bottom-left-radius: 4px;
          box-shadow: inset 0px 1px 0px rgba(255, 255, 255, 0.25);
        `}
      >
        <img 
          css={css`
            margin-right: 5px;
          `}
        src={iconPath + '/image.svg'} /> Preview Hustler
      </button>
)

export default PreviewHustler;