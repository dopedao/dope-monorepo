import Dialog, { DialogProps } from './Dialog';

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
