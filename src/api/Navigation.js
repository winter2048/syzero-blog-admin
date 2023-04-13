import request from '@/plugin/axios'

/**
 * 获取所有导航
 */
export function GetNavigation (params) {
  return request({
    url: `/api/SyZero.Blog/Navigation/List`,
    method: 'get',
    params
  })
}

/**
 * 添加导航
 */
export function AddNavigation (data) {
  return request({
    url: `/api/SyZero.Blog/Navigation`,
    method: 'post',
    data
  })
}

/**
 * 修改导航
 */
export function UpdataNavigation (data) {
  return request({
    url: `/api/SyZero.Blog/Navigation/${data.id}`,
    method: 'put',
    data
  })
}

/**
 * 删除导航
 */
export function DelNavigation (Id) {
  return request({
    url: `/api/SyZero.Blog/Navigation/${Id}`,
    method: 'delete'
  })
}
