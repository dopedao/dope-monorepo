import { css } from '@emotion/react';
import { Box } from '@chakra-ui/react';
import { Item } from 'generated/graphql';

type BulletProps = {
  color?: string;
};

const Bullet = ({ color }: BulletProps) => (
  <Box
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
  />
);

export type ItemProps = Pick<
  Item,
  'name' | 'namePrefix' | 'nameSuffix' | 'suffix' | 'augmented' | 'type' | 'tier'
> & {
  color?: string;
  isExpanded: boolean;
  showRarity: boolean;
};

const DopeItem = ({
  name,
  namePrefix,
  nameSuffix,
  suffix,
  augmented,
  type,
  tier,
  color,
  isExpanded,
  showRarity,
}: ItemProps) => (
  <Box
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
    <Box
      css={css`
        color: ${color || '#fff'};
      `}
    >
      {isExpanded && (
        <>
          <span
            css={css`
              color: #888;
            `}
          >
            {augmented ? ' +1' : ''}
          </span>
          <Box
            css={css`
              color: #888;
              padding-right: 4px;
            `}
          >
            {name}
            {namePrefix ? `${namePrefix} ${nameSuffix} ` : ' '}
            {suffix}
          </Box>
        </>
      )}
    </Box>
    {isExpanded && (
      <Box
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
      </Box>
    )}
  </Box>
);

export default DopeItem;
