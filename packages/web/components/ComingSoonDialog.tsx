import Dialog, { DialogProps } from './Dialog';
import styled from '@emotion/styled';
import { ReactNode } from 'react';

const constructionBackground = `
  #000000 url('/images/desktop/construction-truck.png') center center / contain repeat-y fixed
`;

const ComingSoonDialog = ({
  title,
  className,
  onClose,
  backgroundCss = constructionBackground,
  children,
}: DialogProps) => {
  return (
    <Dialog backgroundCss={backgroundCss} title={title} className={className} onClose={onClose}>
      {children}
    </Dialog>
  );
};
export default ComingSoonDialog;
