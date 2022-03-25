import { useState, useEffect } from 'react'

const useMobile = () => {
  const [isMobile, setMobileMode] = useState(false);
  useEffect(() => {
    resize();
    window.addEventListener("resize", resize);
    return () => {
      window.removeEventListener("resize", resize);
    }
  }, [])

  const resize = () => {
    if (window.innerWidth <= 768) setMobileMode(true)
    else setMobileMode(false)
  }
  return { isMobile };
}

export default useMobile;


export const breakpoints = [
  {
    viewport: 'phone',
    width: 420,
  },
  {
    viewport: 'tablet',
    width: 768,
  },
  {
    viewport: 'laptop',
    width: 1280,
  },
  {
    viewport: 'desktop',
    width: 1440,
  },
  {
    viewport: 'xl',
    width: 1921,
  },
];

export const returnBreakpoint = (breakpointName: string): string | 0 => {
  const bp = breakpoints.find(array => array.viewport === breakpointName);
  return bp === undefined ? 0 : `${bp.width}px`;
};

export const getBreakpointWidth = (breakpointName: string): number | 0 => {
  const bp = breakpoints.find(array => array.viewport === breakpointName);
  return bp === undefined ? 0 : bp.width;
};
