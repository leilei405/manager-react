/**
 * @module utils/storage
 * @description 本地存储
 * @author Lucky
 */

export const setStorage = (key: string, value: any) => {
  localStorage.setItem(key, JSON.stringify(value))
}

export const getStorage = (key: string) => {
  const value = localStorage.getItem(key)
  if (!value) return ''

  try {
    return JSON.parse(value)
  } catch (error) {
    return value
  }
}

export const removeStorage = (key: string) => {
  localStorage.removeItem(key)
}

export const clearStorage = () => {
  localStorage.clear()
}
