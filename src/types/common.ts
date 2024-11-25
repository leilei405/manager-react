export interface IResult<T = any> {
  code: number
  data: T
  msg: string
}

export interface PageParams {
  pageNum?: number
  pageSize?: number
}
