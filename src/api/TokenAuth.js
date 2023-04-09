import request from '@/plugin/axios'

export function AccountLogin (data) {
  return request({
    url: process.env.VUE_APP_LOGIN_API + '/api/SyZero.Authorization/Auth/Login',
    method: 'post',
    data
  })
}

export function LogOut () {
  return request({
    url: process.env.VUE_APP_LOGIN_API + '/api/SyZero.Authorization/Auth/LogOut',
    method: 'post'
  })
}
