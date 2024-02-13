import dynamic from 'next/dynamic';
import { Fragment, ReactNode } from 'react';

// Wrapper for client-side only code because suppressHydrationWarning sucks
// and doesn't work through multiple levels.
const NoSsrFragment = ({ children }: { children: ReactNode }) => <Fragment>{children}</Fragment>;

export const NoSSR = dynamic(() => Promise.resolve(NoSsrFragment), {
  ssr: false,
});
