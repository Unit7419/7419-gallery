import { request } from './request'

export const post = (url, data, configs = {}) =>
  request(url, {
    body: configs.form ? data : JSON.stringify(data),
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      // 'content-type': configs.form
      //   ? // ? 'multipart/form-data'
      //     'application/x-www-form-urlencoded;charset=UTF-8'
      //   : 'application/json',
    },
    method: 'POST',
    mode: 'cors',
  })

export const get = url => request(url)
