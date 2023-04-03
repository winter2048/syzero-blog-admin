import request from '@/plugin/axios'

/**
 * 上传文件
 */
export function Upload (data) {
  return request({
    url: '/Upload',
    method: 'post',
    data,
    headers: { 'Content-Type': 'multipart/form-data' }
  })
}
