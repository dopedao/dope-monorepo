import { css } from '@emotion/react';

type ItemProps = {
  name: string;
  namePrefix?: string | null;
  nameSuffix?: string | null;
  suffix?: string | null;
  augmented?: boolean | null;
  type: string;
  color?: string;
  tier?: string;
  isExpanded: boolean;
  showRarity: boolean;
};

type BulletProps = {
  color?: string;
};

const Bullet = ({ color }: BulletProps) => (
  <div
    css={css`
      height: 10px;
      width: 10px;
      min-width: 10px;
      border-radius: 50%;
      margin-right: 8px;
      background-color: ${color};
      // necessary when 'align-items: top' to ensure proper alignment with text
      margin-top: 4px; 
    `}
  ></div>
);

const Item = ({
  name,
  namePrefix,
  nameSuffix,
  suffix,
  augmented,
  type,
  color,
  tier,
  isExpanded,
  showRarity
}: ItemProps) => (
  <div
    css={css`
      display: flex;
      align-items: top;
      font-size: var(--text-small);
      ${isExpanded && 
        `border-top: 1px solid rgba(255,255,255,0.1);
         padding-top:4px;`
      }
    `}
  >
    <Bullet color={color} />
    <div
      css={css`
        color: ${color};
      `}
    >
      {name}
      {isExpanded && (
        <>
          <span
            css={css`
              color: #888;
            `}
          >
            {augmented ? ' +1' : ''}
          </span>
          <div
            css={css`
              color: #888;
              padding-right: 5px;
            `}
          >
            {namePrefix ? `${namePrefix} ${nameSuffix} ` : ' '}
            {suffix} 
          </div>
        </>
      )}
    </div>
    <div
      css={css`
        color: #888;
        margin-left: auto;
        font-size: var(--text-small);
        text-align: right;
        width: 96px;
      `}
    >
      {`${showRarity && tier?.toLowerCase() !== 'common' ? tier: ''} ${type}`}
    </div>
  </div>
);

export default Item;
