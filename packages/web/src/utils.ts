export const isTouchDevice = () => {
  return (
    typeof window !== 'undefined' &&
    ('ontouchstart' in window ||
      navigator.maxTouchPoints > 0 ||
      (navigator as any).msMaxTouchPoints > 0)
  );
};

export const zeroPad = (i: number) => {
  let iStr = i.toString();
  if (i < 10) {
    iStr = `0${iStr}`;
  }
  return iStr;
};

export const getRandomNumber = (min: number, max: number) => {
  return Math.floor(Math.random() * (max + 1)) + min;
};

export const hexColorToBase16 = (color: string) => {
  return color.replace('#', '0x') + 'ff';
};
