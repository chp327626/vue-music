<!--  -->
<template>
  <div class="commends">
    <div class="song-list">
      <h4>推荐歌单</h4>
      <song-list :itemInfo="itemInfo"/>
    </div>  
    <div class="song-list">
      <h4>新歌推荐</h4>
      <new-song :newSong="newSongList" :flag="1"/>
    </div>

  </div>
</template>

<script>
import { getSongList,getNewSong } from 'network/commend.js'

import SongList from 'components/showSongList/ShowSongList'
import NewSong from 'components/newSong/SongContainer'

export default {
  name: 'commends',
  components: {
    SongList,
    NewSong
  },
  data() {
    return {
      itemInfo: [],    //{id：歌单id picUrl:歌单封面图 playCount:播放数 name:歌单名}
      newSongList: []
    };
  },
  created(){
    getSongList(6).then( res => {   //请求歌单数据
      let reArr = res.data.result;
      for(let i=0;i<reArr.length;i++){
        this.itemInfo.push({
          id: reArr[i].id,
          picUrl: reArr[i].picUrl,
          playCount: reArr[i].playCount,
          name: reArr[i].name
        })
      }
    }).catch( err => {
      console.log(err);
    })

     //获取新歌列表
    getNewSong().then( res => {
      let reArr = res.data.result;
      // for(let i=0;i<reArr.length;i++){
      //   this.newSongList.push({
      //     id: reArr[i].id,
      //     picUrl: reArr[i].picUrl,      
      //     name: reArr[i].name,
      //     artists: reArr[i].song.artists,
      //     album: reArr[i].song.album.name
      //   })
      // }
      this.newSongList = [...reArr]
    }).catch( err => {
      console.log(err);
    })
  }
};
</script>

<style scoped>
  .song-list {
    margin: 15px 3px;
  }

  h4 {
    font-weight: 400;
    margin-bottom: 15px;
  }

  h4::before {
    content: '';
    display: inline-block;
    width: 20px;
    height: 20px;
    margin-right: 5px;
    background: url('~@/assets/img/commend.png');
    background-size: cover;
    vertical-align: sub;
  }
</style>