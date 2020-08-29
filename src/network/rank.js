import { request } from './request'

export function getSongListDetail(id){
  let config = {
    url: '/playlist/detail',
    params: {}
  }

  if(id!=''){
    config.params.id = id
  }

  return request(config)
}