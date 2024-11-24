import { create } from 'zustand'
import { UserInfo } from '@/types'

// zustand 状态库
export const useStore = create<{
  token: string
  userInfo: UserInfo
  collapsed: boolean
  updateUserInfo: (userInfo: UserInfo) => void
  updateToken: (token: string) => void
  updateCollapsed: (collapsed: boolean) => void
}>(set => ({
  token: '', // 登录凭证
  // 用户信息
  userInfo: {
    userImg: '',
    _id: '',
    userId: 0,
    userName: '',
    userEmail: '',
    mobile: '',
    deptId: '',
    deptName: '',
    job: '',
    state: 0,
    role: 0,
    createId: 0,
    roleList: ''
  },
  collapsed: false, // 菜单是否折叠

  // 更新用户信息
  updateUserInfo(userInfo: UserInfo) {
    set({ userInfo })
  },

  // 更新登录凭证
  updateToken(token: string) {
    set({ token })
  },

  // 菜单是否折叠
  updateCollapsed() {
    set(state => {
      return {
        collapsed: !state.collapsed
      }
    })
  }
}))

// import resso from 'resso'
// resso 状态库
// const store = resso({
//   token: '',
//   userInfo: {
//     userName: '',
//     userEmail: ''
//   }
// })
// export default store
