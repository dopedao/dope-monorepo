import { Box } from '@chakra-ui/react';

// For small areas of txt updating the ui
// Like after something has been listed, sold, transferred etc
const StatusText: React.FC = ({ children }) => {
  return (
    <Box p=".5em" fontSize="small" fontStyle="italic">
      <em>{children}</em>
    </Box>
  );
};

export default StatusText;
