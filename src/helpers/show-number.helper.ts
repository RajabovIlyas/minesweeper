export const showNumber = (value: number) =>
  (value / 100) >= 1 ?
    value :
    (value / 10) >= 1 ?
      `0${value}` :
      `00${value}`;
