import { request } from './request'

export function getSongList(limit){  //获取推荐歌单
  let config = {
    url: '/personalized',
    params: {}
  }

  if(limit!=0){
    config.params.limit = limit
  }

  return request(config)
}

export function getNewSong(){  //获取新歌
  return request({
    url: '/personalized/newsong'
  })
}

export function getMusciUrl(id){
  return request({
    url:'/song/url',
    params: {
      id
    }
  })
}

export function getSongInfo(id){
  return request({
    url: '/song/detail',
    params: {
      ids: id
    }
  })
}



