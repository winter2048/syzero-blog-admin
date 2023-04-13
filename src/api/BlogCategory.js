import request from '@/plugin/axios'

/**
 * 获取所有博客分类
 */
export function GetBlogCategory(params) {
  return request({
    url: '/api/SyZero.Blog/ArticleCategory/List',
    method: 'get',
    params
  })
}

/**
 * 添加博客分类
 */
export function AddBlogCategory(data) {
  return request({
    url: '/api/SyZero.Blog/ArticleCategory',
    method: 'post',
    data
  })
}

/**
 * 修改博客分类
 */
export function UpdataBlogCategory(data) {
  return request({
    url: `/api/SyZero.Blog/ArticleCategory/${data.id}`,
    method: 'put',
    data
  })
}

/**
 * 删除博客分类
 */
export function DelBlogCategory(Id) {
  return request({
    url: `/api/SyZero.Blog/ArticleCategory/${Id}`,
    method: 'delete'
  })
}
