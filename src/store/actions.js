import { getMusciUrl,getSongInfo,checkMusic } from 'network/commend'

export default {
  getMusicUrl(context,id){
    getMusciUrl(id).then( res=> {
      let url = res.data.data[0].url;
      context.commit('setMusicUrl',url);
    }).catch( err=> {
      console.log(err);
    })
  }

  // getPoster(context,id){
  //   getSongInfo(id).then( res => {
  //     let picUrl = res.data.songs[0].al.picUrl;
  //     context.commit('setPosterUrl',picUrl)
  //   }).catch( err => {
  //     console.log(err);
  //   })
  // }
}