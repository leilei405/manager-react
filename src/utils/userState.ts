export const statusFormat = (status: number) => {
  return {
    1: '在职',
    2: '试用期',
    3: '离职'
  }[status]
}
