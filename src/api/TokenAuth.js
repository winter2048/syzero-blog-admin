import request from '@/plugin/axios'
import Vue from 'vue'

export function AccountLogin (data) {
  return request({
    url: Vue.prototype.$config.SERVER_URL_LOGIN + '/api/SyZero.Authorization/Auth/Login',
    method: 'post',
    data
  })
}

export function LogOut () {
  return request({
    url: Vue.prototype.$config.SERVER_URL_LOGIN + '/api/SyZero.Authorization/Auth/LogOut',
    method: 'post'
  })
}
