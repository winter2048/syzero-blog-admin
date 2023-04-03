import request from '@/plugin/axios'
/**
 * 获取所有博客
 */
export function GetBlog (params) {
  return request({
    url: process.env.VUE_APP_API + '/api/SyZero.Blog/Article/List',
    method: 'get',
    params
  })
}

/**
 * 获取所有博客
 */
export function GetBlogDetail (id) {
  return request({
    url: process.env.VUE_APP_API + `/api/SyZero.Blog/Article/${id}`,
    method: 'get'
  })
}

/**
 * 添加博客
 */
export function AddBlog (data) {
  return request({
    url: process.env.VUE_APP_API + `/api/SyZero.Blog/Article`,
    method: 'post',
    data
  })
}
/**
 * 更新博客
 */
export function UpdataBlog (data) {
  return request({
    url: process.env.VUE_APP_API + `/api/SyZero.Blog/Article/${data.id}`,
    method: 'put',
    data
  })
}

/**
 * 删除博客分类
 */
export function DelBlog (Id) {
  return request({
    url: process.env.VUE_APP_API + `/api/SyZero.Blog/Article/${Id}`,
    method: 'delete'
  })
}
