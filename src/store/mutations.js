import state from "./state"

export default {
  clear(){
    state.isPlay = false
    state.currTime = 0
    state.currMusicId = 0  
    state.currMusicName = ''
    state.duration = 0    
    state.picUrl = ''     
    state.artists = ''    
    state.musicUrl = ''   
    state.playList = []
    state.curIndex = -1   
  },
  switch(){
    state.isPlay = !state.isPlay;
  },
  play(){
    state.isPlay = true;
  },
  pause(){
    state.isPlay = false;
  },
  getDuration(state,duration){
    state.duration = duration
  },
  setCurTime(state,currTime){
    state.currTime = currTime
  },
  changeSong(state,info){
    if(info.id == state.currMusicId){
      return
    }

    if(state.playList.findIndex(value => value.id == info.id) == -1){    //新歌曲不存在于列表中
      state.playList.push(info)
    }

    this.dispatch('getMusicUrl',info.id);

    state.currMusicId = info.id;
    state.currMusicName = info.songName;
    state.picUrl = info.picUrl;
    state.artists = info.artists;
    state.isPlay = false;
    this.commit('updateIndex')
  }, 
  deleteSong(state,info){
    let index = state.playList.findIndex(value => value.id == info.id)
    state.playList.splice(index,1)
    if(state.playList.length == 0){
      this.commit('clear')
    }
    else{
      if(info.id == state.currMusicId){   //如果删除的是正在播放的音乐，则跳到第一首音乐
        this.commit('changeSong',state.playList[0])
        this.dispatch('getMusicUrl',state.playList[0].id)
      }
    }
    this.commit('updateIndex')
  },
  setMusicUrl(state,url){
    state.musicUrl = url;
  },
  setPosterUrl(state,url){
    state.picUrl = url;
  },
  updateIndex(){
    state.curIndex = state.playList.findIndex( value => value.id == state.currMusicId );
  },
  prevMusic(){
    if(state.curIndex == 0){
      state.curIndex = state.playList.length - 1;
    }
    else{
      state.curIndex--;
    }
    this.commit('changeSong',state.playList[state.curIndex])
  },
  nextMusic(){
    state.curIndex = (state.curIndex + 1) % state.playList.length;
    this.commit('changeSong',state.playList[state.curIndex])
  },
  changeTime(state,newTime){
    state.newTime = newTime
    state.change = !state.change
  }
}