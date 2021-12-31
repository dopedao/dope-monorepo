export const truncate = (str: string, maxLength: number = 250) =>
  str.length > maxLength ? `${str.substring(0, maxLength - 3)}...` : str.substring(0, maxLength);
