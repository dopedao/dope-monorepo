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

export const getRandomDate = (date1: string, date2: string) => {
  const time1 = new Date(date1).getTime();
  const time2 = new Date(date2).getTime();
  if (time1 > time2) {
    return new Date(getRandomNumber(time2, time1)).toLocaleDateString();
  } else {
    return new Date(getRandomNumber(time1, time2)).toLocaleDateString();
  }
};

export const hexColorToBase16 = (color: string) => color.replace('#', '0x') + 'ff';

export const formatLargeNumber = (num: number) => {
  if (num > 999 && num < 1000000) {
    return (num / 1000).toFixed(1) + 'K';
  } else if (num > 1000000) {
    return (num / 1000000).toFixed(1) + 'M';
  } else if (num < 900) {
    return num;
  }
};

export const getShortAddress = (address: string | undefined | null) => {
  if (address && address.startsWith('0x')) {
    return address.substr(0, 4) + '...' + address.substr(address.length - 4);
  }
  return address;
};
