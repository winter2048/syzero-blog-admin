import request from '@/plugin/axios'
import Vue from 'vue'

/**
 * 获取用户信息
 */
export function GetUserInfo () {
  return request({
    url: Vue.prototype.$config.SERVER_URL_LOGIN + '/api/SyZero.Authorization/User/UserInfo',
    method: 'get'
  })
}

/**
 * 修改用户信息
 */
export function UpdataUserInfo (data) {
  return request({
    url: Vue.prototype.$config.SERVER_URL_LOGIN + '/api/SyZero.Authorization/User/UserInfo',
    method: 'put',
    data
  })
}

/**
 * 获取所有用户
 */
export function GetUser (params) {
  return request({
    url: Vue.prototype.$config.SERVER_URL_LOGIN + '/api/SyZero.Authorization/User/List',
    method: 'get',
    params
  })
}

/**
 * 添加用户
 */
export function AddUser (data) {
  return request({
    url: Vue.prototype.$config.SERVER_URL_LOGIN + '/api/SyZero.Authorization/User',
    method: 'post',
    data
  })
}

/**
 * 修改用户
 */
export function UpdataUser (data) {
  return request({
    url: Vue.prototype.$config.SERVER_URL_LOGIN + `/api/SyZero.Authorization/User/${data.id}`,
    method: 'put',
    data
  })
}

/**
 * 删除用户
 */
export function DelUser (Id) {
  return request({
    url: Vue.prototype.$config.SERVER_URL_LOGIN + `/api/SyZero.Authorization/User/${Id}`,
    method: 'delete'
  })
}

/**
 * 修改用户头像
 */
export function ChangeAvatar (data) {
  return request({
    url: '/User/ChangeAvatar',
    method: 'post',
    data
  })
}
