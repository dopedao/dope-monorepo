import { css } from '@emotion/react';

export type ItemProps = {
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
      background-color: ${color || '#fff'};
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
  showRarity,
}: ItemProps) => (
  <div
    css={css`
      display: ${isExpanded ? 'flex' : 'inline-block'};
      align-items: top;
      line-height: 1.25em;
      font-size: var(--text-small);
      ${isExpanded &&
      `
        border-top: 1px solid rgba(255,255,255,0.1);
        padding-top:4px;
        padding-bottom: 4px;
      `}
    `}
  >
    <Bullet color={color} />
    <div
      css={css`
        color: ${color || '#fff'};
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
              padding-right: 4px;
            `}
          >
            {namePrefix ? `${namePrefix} ${nameSuffix} ` : ' '}
            {suffix}
          </div>
        </>
      )}
    </div>
    {isExpanded && (
      <div
        css={css`
          color: #888;
          margin-left: auto;
          font-size: var(--text-small);
          text-align: right;
          width: 25%;
        `}
      >
        {`${
          showRarity && tier?.toLowerCase() !== 'common' ? tier?.toString().replace('_', ' ') : ''
        } ${type}`}
      </div>
    )}
  </div>
);

export default Item;
