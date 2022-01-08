import { css } from '@emotion/react';

type RowProps = {
  title: string;
  value: string;
  color?: string;
};

const betterItemName = (name = '') => {
  const quotedIndex = name.lastIndexOf('"');
  if (quotedIndex !== -1) {
    const modifier = name.substr(0, quotedIndex + 1);
    const itemName = name.substr(quotedIndex + 1);
    return (
      <>
        <span
          css={css`
            margin-left: -0.9em;
            display: inline;
            font-size: 1.1em;
          `}
        >
          {modifier}
        </span>
        <br />
        <span
          css={css`
            display: inline;
            margin-top: 0.6em;
          `}
        >
          {itemName}
        </span>
      </>
    );
  }
  return name;
};

const Row = ({ title, value, color }: RowProps) => (
  <div
    css={css`
      width: 100%;
      display: flex;
      border-bottom: 1px solid #dededd;
      div {
        padding: 12px 12px;
      }
    `}
  >
    <div
      css={css`
        color: rgb(26, 32, 44);
        width: 33%;
        text-align: right;
        border-right: 1px solid #dededd;
        white-space: nowrap;
      `}
    >
      {title}
    </div>
    <div
      css={css`
        width: 66%;
      `}
    >
      <span
        css={css`
          background-color: ${color || 'unset'};
          padding: 2px 4px;
          color: #000;
        `}
      >
        {betterItemName(value)}
      </span>
    </div>
  </div>
);

export default Row;
