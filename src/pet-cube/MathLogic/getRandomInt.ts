  export const getRandomInt: any = () => {
    const number = Number((Math.random() * (7 - 0) + 0).toPrecision(1));
    return number < 1 || number > 6 ? getRandomInt() : number;
  };