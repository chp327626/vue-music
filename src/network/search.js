import { request } from './request'

export function search(keywords){
  let config = {
    url: '/cloudsearch',
    params: {
      keywords,
      limit: 20
    }
  }

  return request(config)
}

export function hotSearch(){
  return request({
    url: '/search/hot'
  })
}