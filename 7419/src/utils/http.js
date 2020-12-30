import { request } from './request'
import { ls } from './ls'
import { LOCAL_STORAGE_LOGIN_KEY } from './const'

export const post = (url, data = {}) => {
  const options = {
    body: data,
    // headers: {
    //   'Content-Type': 'application/x-www-form-urlencoded',
    // },
  }

  if (data.constructor !== FormData) {
    options.headers = {
      'content-type': 'application/json',
    }

    options.body = JSON.stringify({
      user: ls.get(LOCAL_STORAGE_LOGIN_KEY),
      ...data,
    })
  }

  return request(url, {
    cache: 'no-cache',
    credentials: 'same-origin',
    method: 'POST',
    // mode: 'no-cors',
    ...options,
  })
}

export const get = url => request(url)
