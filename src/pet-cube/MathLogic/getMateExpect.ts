export const getMateExpect: any = (percent: number) => {
  const result = Number(((percent / 100) * 5 + (1 - percent / 100) * -1).toFixed(3));
  return isNaN(result) ? 0 : result;
};
