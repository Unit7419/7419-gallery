console.log(process.env.NODE_ENV, '====>sss')
const testEnv = process.env.NODE_ENV === 'development'

export const DOMAIN = testEnv
  ? // 本地开发DEBUG换成本机IP（Jiraya-server）
    'http://10.87.59.33:7001'
  : 'http://47.100.219.10:7001'
// export const DOMAIN = '192.168.1.10:7001'
export const STATIC_DOMAIN = 'http://47.100.219.10:15536'
