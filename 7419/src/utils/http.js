import { request } from './request'

export const post = (url, data) =>
  request(url, {
    body: JSON.stringify(data),
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'content-type': 'application/json',
    },
    method: 'POST',
    mode: 'cors',
  })

export const get = url => request(url)
