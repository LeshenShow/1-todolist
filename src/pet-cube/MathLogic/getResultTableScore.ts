export const getResultTableScore: any = (resultArray: [], element: number) => {
  const result = Number((100 * resultArray.filter((v) => v === element).length / resultArray.length).toFixed(2))
  return isNaN(result) ? 0: result
}

