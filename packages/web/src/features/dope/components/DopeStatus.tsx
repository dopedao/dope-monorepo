import { css } from '@emotion/react';
import { Image, Box, HStack } from '@chakra-ui/react';
import StatusContainer from 'components/StatusContainer';

const iconPath = '/images/icon';

type RowProps = {
  content: string;
  status: boolean;
};

type StatusIconProps = {
  status: boolean;
};

const DopeStatus = ({ content, status }: RowProps) => (
  <StatusContainer>
    {content === 'paper' ? (
      <Box fontSize="xs">{status ? 'Can Claim $PAPER' : 'No $PAPER To Claim'}</Box>
    ) : (
      <Box fontSize="xs">🚫 {status ? 'Can Mint Hustler' : 'Hustler Minted'} 🚫</Box>
    )}
  </StatusContainer>
);

const StatusIcon = ({ status }: StatusIconProps) => (
  <Image
    css={css`
      display: block;
      margin-right: 4px;
    `}
    src={status ? `${iconPath}/check-sm.svg` : `${iconPath}/circle-slash.svg`}
    alt={status ? 'Yes' : 'No'}
  />
);

export default DopeStatus;
