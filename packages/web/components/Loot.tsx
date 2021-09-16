import { css } from '@emotion/react';
import { Button } from '@chakra-ui/react';

export const Loot = () => {
  return (
    <div
      css={css`
        border: 2px solid #000;
        display: flex;
        flex-direction: column;
        height: 640px;
        width: 500px;
      `}
    >
      <div
        css={css`
          display: flex;
          align-items: center;
          justify-content: center;
          height: 32px;
          background: #dededd;
          border-bottom: 2px solid #000;
        `}
      >
        Dope Wars Loot #0754
      </div>
      <div
        css={css`
          flex: 1;
          background: #fff;
        `}
      ></div>
      <div
        css={css`
          display: flex;
          align-items: center;
          height: 44px;
          background: #dededd;
          border-top: 2px solid #000;
          padding: 0 16px;

          > button {
            margin-right: 10px;
          }
        `}
      >
        <Button>Unbundle</Button>
        <Button>Claim Paper</Button>
      </div>
    </div>
  );
};

export default Loot;
