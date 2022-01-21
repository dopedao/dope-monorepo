import { css } from '@emotion/react';

const iconPath = '/images/icon';

type RowProps = {
  content: string;
  status: boolean;
};

type StatusIconProps = {
  status: boolean;
}

const DopeStatus = ({ content, status }: RowProps) => (
  <div
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
          { status ? "Contains $Paper" : "Does not contain $Paper" }
        </span>
      </>
    :
      <>
        <StatusIcon status={status} />
        <span>
          { status ? "Has Dope Gear" : "Does not have Dope Gear"}
        </span>
      </>
    }
  </div>
);

const StatusIcon = ({status} : StatusIconProps) => (
  <img
    css={css`
      margin-right: 5px;
    `}
    src={status ? iconPath+'/check-sm.svg' : iconPath+'/circle-slash.svg' }
  />
);


export default DopeStatus;
