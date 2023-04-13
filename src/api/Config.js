import request from '@/plugin/axios'
/**
 * 获取基础设置
 */
export function GetBasicsSetting () {
  return request({
    url: '/api/SyZero.Blog/Config/BasicsSetting',
    method: 'get'
  })
}

/**
 * 获取Seo设置
 */
export function GetSeoSetting () {
  return request({
    url: '/api/SyZero.Blog/Config/SeoSetting',
    method: 'get'
  })
}

/**
 * 更新基础设置
 */
export function UpdataBasicsSetting (data) {
  return request({
    url: '/api/SyZero.Blog/Config/BasicsSetting',
    method: 'post',
    data
  })
}

/**
 * 更新Seo设置
 */
export function UpdataSeoSetting (data) {
  return request({
    url: '/api/SyZero.Blog/Config/SeoSetting',
    method: 'post',
    data
  })
}
/**
 * 获取其他设置
 */
export function GetOtherSetting () {
  return request({
    url: '/api/SyZero.Blog/Config/OtherSetting',
    method: 'get'
  })
}
/**
 * 更新其他设置
 */
export function UpdataOtherSetting (data) {
  return request({
    url: '/api/SyZero.Blog/Config/OtherSetting',
    method: 'post',
    data
  })
}

/**
 * 获取阿里短信配置
 */
export function GetAliyunSmsConfig () {
  return request({
    url: '/api/SyZero.Blog/Config/AliyunSmsConfig',
    method: 'get'
  })
}
/**
 * 更新阿里短信配置
 */
export function UpdataAliyunSmsConfig (data) {
  return request({
    url: '/api/SyZero.Blog/Config/AliyunSmsConfig',
    method: 'post',
    data
  })
}
