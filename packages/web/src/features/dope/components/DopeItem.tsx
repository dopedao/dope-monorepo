import { css } from '@emotion/react';

type ItemProps = {
  name: string;
  namePrefix?: string | null;
  nameSuffix?: string | null;
  suffix?: string | null;
  augmented?: boolean | null;
  type: string;
  color?: string;
  isExpanded: boolean;
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
  isExpanded,
}: ItemProps) => (
  <div
    css={css`
      display: flex;
      align-items: top;
    `}
  >
    <Bullet color={color} />
    <div
      css={css`
        color: ${color};
        font-size: 12px;
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
              font-size: 12px;
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
        font-size: 12px;
      `}
    >
      {type}
    </div>
  </div>
);

export default Item;
