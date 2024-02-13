import { Image } from '@chakra-ui/react';
import { css } from '@emotion/react';
const iconPath = '/images/icon';

type PreviewProps = {
  isPreviewShown: boolean;
  togglePreview(): void;
  disabled: boolean;
};

const DopeCardPreviewButton = ({ isPreviewShown, togglePreview, disabled }: PreviewProps) => (
  <button
    onClick={() => {
      (disabled
        ? () => {
            return false;
          }
        : togglePreview)();
    }}
    css={css`
      width: 100%;
      color: ${disabled ? '#999' : '#fff'};
      display: flex;
      padding: 6px;
      align-items: center;
      justify-content: center;
      background-color: #434345;
      border-bottom: 2px solid #000;
      border-right: 2px solid #000;
      border-left: 2px solid #000;
      border-bottom-right-radius: 4px;
      border-bottom-left-radius: 4px;
      box-shadow: inset 0px 1px 0px rgba(255, 255, 255, 0.25);
    `}
  >
    {!isPreviewShown && (
      <>
        {!disabled && (
          <Image
            css={css`
              margin-right: 4px;
            `}
            src={`${iconPath}/image.svg`}
            width="12px"
            height="12px"
            alt="Image"
          />
        )}
        {disabled ? 'No Preview Available' : 'Preview Hustler'}
      </>
    )}
    {isPreviewShown && (
      <>
        <Image
          css={css`
            margin-right: 4px;
            margin-top: 2px;
          `}
          src={`${iconPath}/close.svg`}
          width="12px"
          height="12px"
          alt="Close"
        />
        Close Hustler Preview
      </>
    )}
  </button>
);

export default DopeCardPreviewButton;
