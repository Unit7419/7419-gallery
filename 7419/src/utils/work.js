import { get, post } from './http'
import { PUT_PHOTOS_API, GET_PHOTOS_API, SIGN_API } from './api'
import { ls } from './ls'
import { LOCAL_STORAGE_LOGIN_KEY } from './const'

export const isLoginService = async data => {
  const local = data || ls.get(LOCAL_STORAGE_LOGIN_KEY)

  if (local) {
    return (await post(SIGN_API, local)) || {}
  }
}

export const uploadPhotoAPI = form => post(PUT_PHOTOS_API, form)

export const getPhotosAPI = () => get(GET_PHOTOS_API)
