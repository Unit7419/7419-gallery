const testEnv = process.env.NODE_ENV === 'development'

export const DOMAIN = testEnv
  ? // 本地开发DEBUG换成本机IP（Jiraya-server）
    'http://192.168.1.7:7001'
  : 'http://47.100.219.10:7001'
// export const DOMAIN = '192.168.1.10:7001'

export const STATIC_DOMAIN = 'http://47.100.219.10:15536'

export const LOCAL_STORAGE_LOGIN_KEY = 'account_7419_gallery'