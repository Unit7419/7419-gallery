import { get, post } from './http'
import { PUT_PHOTOS_API, GET_PHOTOS_API, SIGN_API } from './api'
import { ls } from './ls'
import { LOCAL_STORAGE_LOGIN_KEY } from './const'
import { message } from 'antd'

export const concurrencyUploadService = async formList => {
  while (formList.length) {
    const queue = formList.splice(0, 3)
    const count = queue.length

    await Promise.all(queue.map(uploadPhotoAPI))
      .then(() => {
        message.success(`Number of successful concurrent uploads: ${count}!`)
      })
      .catch(() => {
        message.error(`Number of failed concurrent uploads: ${count}.`)
      })
  }
}

export const isLoginService = async data => {
  const local = data || ls.get(LOCAL_STORAGE_LOGIN_KEY)

  if (local) {
    return (await post(SIGN_API, local)) || {}
  }
}

export const uploadPhotoAPI = form => post(PUT_PHOTOS_API, form)

export const getPhotosAPI = () => get(GET_PHOTOS_API)
