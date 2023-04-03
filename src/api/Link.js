import request from '@/plugin/axios'

/**
 * 获取所有友链
 */
export function GetLink (params) {
  return request({
    url: process.env.VUE_APP_API + `/api/SyZero.Blog/Link/List`,
    method: 'get',
    params
  })
}

/**
 * 添加友链
 */
export function AddLink (data) {
  return request({
    url: process.env.VUE_APP_API + `/api/SyZero.Blog/Link`,
    method: 'post',
    data
  })
}

/**
 * 修改友链
 */
export function UpdataLink (data) {
  return request({
    url: process.env.VUE_APP_API + `/api/SyZero.Blog/Link/${data.id}`,
    method: 'put',
    data
  })
}

/**
 * 删除友链
 */
export function DelLink (Id) {
  return request({
    url: process.env.VUE_APP_API + `/api/SyZero.Blog/Link/${Id}`,
    method: 'delete'
  })
}
