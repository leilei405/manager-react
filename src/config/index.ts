/**
 * 环境配置封装
 */

type ENV = 'dev' | 'stg' | 'prd'

// let env: ENV = 'dev'
// if (location.host.indexOf('localhost') > -1) {
//   env = 'dev'
// } else if (location.host === 'driver-stg.marsview.cc') {
//   env = 'stg'
// } else {
//   env = 'prd'
// }

const env = (document.documentElement.dataset.env as ENV) || 'stg'

const config = {
  dev: {
    baseApi: '/api',
    uploadApi: 'http://api-driver-dev.marsview.cc',
    cdn: 'http://xxx.aliyun.com',
    mock: false,
    mockApi: 'https://www.fastmock.site/mock/aad4bc063f222b3a0b2319520af56ff8/api'
  },
  stg: {
    baseApi: '/api',
    uploadApi: 'http://api-driver-stg.marsview.cc',
    cdn: 'http://xxx.aliyun.com',
    mock: false,
    mockApi: 'https://www.fastmock.site/mock/aad4bc063f222b3a0b2319520af56ff8/api'
  },
  prd: {
    baseApi: '/api',
    uploadApi: 'http://api-driver.marsview.cc',
    cdn: 'http://xxx.aliyun.com',
    mock: false,
    mockApi: 'https://www.fastmock.site/mock/aad4bc063f222b3a0b2319520af56ff8/api'
  }
}

export default {
  env,
  ...config[env]
}
