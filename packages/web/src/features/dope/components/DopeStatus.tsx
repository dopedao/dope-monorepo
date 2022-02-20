import { css } from '@emotion/react';
import { Image } from '@chakra-ui/image';
import styled from '@emotion/styled';

const iconPath = '/images/icon';

type RowProps = {
  content: string;
  status: boolean;
};

type StatusIconProps = {
  status: boolean;
};

const StatusContainer = styled.div<{ status?: boolean }>`
  font-size: (--text-small);
  display: flex;
  padding: 6px;
  background-color: ${({ status }) => (status ? '#9BFFCB' : '#DEDEDD')};
  margin-top: 8px;
  border-radius: 2px;
`;
const DopeStatus = ({ content, status }: RowProps) => (
  <StatusContainer status={status}>
    {content == 'paper' ? (
      <>
        <StatusIcon status={status} />
        <span>{status ? 'Can Claim $PAPER' : 'No $PAPER To Claim'}</span>
      </>
    ) : (
      <>
        <StatusIcon status={status} />
        <span>{status ? 'Can Claim Gear & Initiate Hustler' : 'No Gear To Claim'}</span>
      </>
    )}
  </StatusContainer>
);

const StatusIcon = ({ status }: StatusIconProps) => (
  <Image
    css={css`
      display: block;
      margin-right: 4px;
    `}
    src={status ? iconPath + '/check-sm.svg' : iconPath + '/circle-slash.svg'}
    alt={status ? 'Yes' : 'No'}
  />
);

export default DopeStatus;
