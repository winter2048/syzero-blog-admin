import request from '@/plugin/axios'
/**
 * 获取所有页面
 */
export function GetPage (params) {
  return request({
    url: `/api/SyZero.Blog/Page`,
    method: 'get',
    params
  })
}

/**
 * 获取所有页面
 */
export function GetPageDetail (id) {
  return request({
    url: `/api/SyZero.Blog/Page/${id}`,
    method: 'get',
    params: {
      id
    }
  })
}

/**
 * 添加页面
 */
export function AddPage (data) {
  return request({
    url: `/api/SyZero.Blog/Page`,
    method: 'post',
    data
  })
}
/**
 * 更新页面
 */
export function UpdataPage (data) {
  return request({
    url: `/api/SyZero.Blog/Page/${data.id}`,
    method: 'put',
    data
  })
}

/**
 * 删除页面
 */
export function DelPage (Id) {
  return request({
    url: `/api/SyZero.Blog/Page/${Id}`,
    method: 'delete'
  })
}
