import { css } from '@emotion/react';
import { Image } from '@chakra-ui/image';

const iconPath = '/images/icon';

type RowProps = {
  content: string;
  status: boolean;
};

type StatusIconProps = {
  status: boolean;
}

const DopeStatus = ({ content, status }: RowProps) => (
  <div className="small"
    css={css`
      display: flex;
      padding: 6px;
      background-color: ${status ? '#9BFFCB' : '#DEDEDD'};
      margin-top: 8px;
      border-radius: 2px;
    `}
  >
    {content == 'paper' ? 
      <>
        <StatusIcon status={status} />
        <span> 
          { status ? "Can Claim $PAPER" : "No $PAPER To Claim" }
        </span>
      </>
    :
      <>
        <StatusIcon status={status} />
        <span>
          { status ? "Can Claim Gear & Initiate Hustler" : "No Gear To Claim"}
        </span>
      </>
    }
  </div>
);

const StatusIcon = ({status} : StatusIconProps) => (
  <Image
    css={css`
      display: block;
      margin-right: 4px;
    `}
    src={status ? iconPath+'/check-sm.svg' : iconPath+'/circle-slash.svg' }
    alt={status ? 'Yes' : 'No' }
  />
);


export default DopeStatus;
