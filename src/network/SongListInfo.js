import { request } from './request'

export function getListDetail(id){
  return request({
    url: '/playlist/detail',
    params: {
      id
    }
  })
}