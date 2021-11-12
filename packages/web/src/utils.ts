export const isTouchDevice = () => {
  return (
    typeof window !== 'undefined' &&
    ('ontouchstart' in window ||
      navigator.maxTouchPoints > 0 ||
      (navigator as any).msMaxTouchPoints > 0)
  );
};

export const formatLargeNumber = (num: number) => {
  if (num > 999 && num < 1000000) {
    return (num / 1000).toFixed(1) + 'K';
  } else if (num > 1000000) {
    return (num / 1000000).toFixed(1) + 'M';
  } else if (num < 900) {
    return num;
  }
};
