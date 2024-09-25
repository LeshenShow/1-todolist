export const getNewScore: any = ( bid : string, score: number, isWinner: boolean) => {
  console.log('enter func');

  switch(bid) {
    case '1x':
      return isWinner ? score + 4 : score -1
    case '5x':
      return isWinner ? score + 20 : score -5
    case '10x':
      return isWinner ? score + 90 : score -10
  default:
    break
}
  };