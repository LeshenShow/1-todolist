export const getNewScore: any = ( bid : string, score: number, isWinner: boolean) => {
  switch(bid) {
    case '1x':
      return isWinner ? score + 5: score -1
    case '5x':
      return isWinner ? score + 20 : score -5
    case '10x':
      return isWinner ? score + 40 : score -10
  default:
    break
}
  };