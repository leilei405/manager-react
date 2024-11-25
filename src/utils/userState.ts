export const statusFormat = (status: number) => {
  return {
    1: '在职',
    2: '试用期',
    3: '离职'
  }[status]
}

export const roleFormat = (role: string) => {
  return {
    0: '超级管理员',
    1: '管理员',
    2: '体验管理员',
    3: '普通用户'
  }[role]
}
