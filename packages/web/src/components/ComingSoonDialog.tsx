import Dialog, { DialogProps } from './Dialog';
import { css } from '@emotion/react';

export const constructionBackground = `
  #000000 url('/images/desktop/construction-truck.png') center center / contain repeat-y fixed
`;

const ComingSoonDialog = ({
  title,
  className,
  onClose,
  backgroundCss = constructionBackground,
  children,
  icon,
}: DialogProps) => {
  return (
    <Dialog
      backgroundCss={backgroundCss}
      css={css`
        image-rendering: pixelated;
      `}
      title={title}
      className={className}
      onClose={onClose}
      icon={icon}
    >
      {children}
    </Dialog>
  );
};
export default ComingSoonDialog;
