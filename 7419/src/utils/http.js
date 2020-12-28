import { request } from './request'

export const post = (url, data, configs = {}) => {
  const options = {
    body: data,
    // headers: {
    //   'Content-Type': 'application/x-www-form-urlencoded',
    // },
  }

  if (!configs.form) {
    options.headers = {
      'content-type': 'application/json',
    }

    options.body = JSON.stringify(data)
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
