export interface IResult<T = any> {
  code: number
  data: T
  msg: string
}
