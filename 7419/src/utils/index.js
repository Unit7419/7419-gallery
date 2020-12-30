import { ls } from './ls'
import { LOCAL_STORAGE_LOGIN_KEY } from './const'

export * from './request'
export * from './api'
export * from './const'
export * from './http'
export * from './work'
export * from './ls'

export const getUserInfo = () => ls.get(LOCAL_STORAGE_LOGIN_KEY) || {}

export const debounce = (func, wait, immediate) => {
  let timeout
  return function () {
    const context = this,
      args = arguments
    let later = function () {
      timeout = null
      if (!immediate) func.apply(context, args)
    }
    const callNow = immediate && !timeout
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
    if (callNow) func.apply(context, args)
  }
}
