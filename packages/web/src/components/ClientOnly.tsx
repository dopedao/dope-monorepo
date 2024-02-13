import { useEffect, useState } from 'react';
import { Box } from '@chakra-ui/react';

export default function ClientOnly({ children, ...delegated }: any) {
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) {
    return null;
  }

  return <Box {...delegated}>{children}</Box>;
}
