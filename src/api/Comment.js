import request from '@/plugin/axios'

/**
 * 获取所有评论
 */
export function GetComment (params) {
  return request({
    url: '/api/SyZero.Blog/Comment',
    method: 'get',
    params
  })
}

/**
 * 添加评论
 */
export function AddComment (data) {
  return request({
    url: '/api/SyZero.Blog/Comment',
    method: 'post',
    data
  })
}

/**
 * 修改评论
 */
export function UpdataComment (data) {
  return request({
    url: `/api/SyZero.Blog/Comment/${data.id}`,
    method: 'put',
    data
  })
}

/**
 * 删除评论
 */
export function DelComment (Id) {
  return request({
    url: `/api/SyZero.Blog/Comment/${Id}`,
    method: 'delete'
  })
}
