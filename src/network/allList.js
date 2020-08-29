import { request } from './request'

export function getTopList(offset=0,limit=12){
  return request({
    url: '/top/playlist',
    params: {
      limit,
      offset: offset*limit
    }
  })
}