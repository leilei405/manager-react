type OptionType = {
  value: number | string
  label: string
}

// 用户状态
export const stateOption: OptionType[] = [
  {
    value: 1,
    label: '所有'
  },
  {
    value: 2,
    label: '在职'
  },
  {
    value: 3,
    label: '试用期'
  },
  {
    value: 4,
    label: '离职'
  }
]

// 角色
export const roleOption: OptionType[] = [
  {
    value: 0,
    label: '超级管理员'
  },
  {
    value: 1,
    label: '管理员'
  },
  {
    value: 2,
    label: '体验管理员'
  },
  {
    value: 3,
    label: '普通用户'
  }
]

// 菜单类型
export const menuTypeOption: OptionType[] = [
  {
    value: 1,
    label: '菜单'
  },
  {
    value: 2,
    label: '按钮'
  },
  {
    value: 3,
    label: '页面'
  }
]

// 菜单状态
export const menuStateOption: OptionType[] = [
  {
    value: 1,
    label: '启用'
  },
  {
    value: 2,
    label: '禁用'
  }
]
