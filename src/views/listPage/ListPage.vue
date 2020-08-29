<template>
  <div class="detail-page">
    <list-description :details="details"/>
    <h4> 歌曲列表</h4>
    <song-container :newSong="songs" :flag="2"/>
  </div>
</template>

<script>
import { getListDetail } from 'network/SongListInfo'

import ListDescription from 'components/showSongList/ListDescription'
import SongContainer from 'components/newSong/SongContainer'

export default {
  name: 'listPage',
  components: {
    ListDescription,
    SongContainer
  },
  data() {
    return {
      id: 0,
      details: {},
      songs: []
    };
  },
  watch: {
    songs(){
      
    }
  },
  created(){
    this.id = this.$route.params.id;
    
    getListDetail(this.id).then( res => {
      let data = res.data.playlist;
      this.details = {
        title: data.name,               //标题
        description: data.description,  //简介
        coverImgUrl: data.coverImgUrl,   //封面url
        tags: data.tags                 //标签
      }
      let tracks = data.tracks
      for(let i=0;i<tracks.length;i++){
        // this.songs.push({ //id   picUrl：歌曲封面 name:歌曲名 artists:歌手数组 album:专辑名
        //   id: tracks[i].id,
        //   picUrl: tracks[i].al.picUrl,
        //   name: tracks[i].name,
        //   artists: tracks[i].ar,
        //   album: tracks[i].al.name
        // })
        this.songs = [...tracks]
      }
    }).catch( err => {
      this.$toast.fail('加载失败')
    })
  }
};
</script>

<style scoped>
  .detail-page {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    margin-bottom: 55px;
    z-index: 950;
    background-color: #d6eef8;
  }

  h4 {
    font-weight: 600;
    margin-bottom: 15px;
    padding: 5px 0;
    background-color: #eee;
  }

  h4::before {
    content: '';
    display: inline-block;
    height: 20px;
    border-left:2px solid red;
    vertical-align: sub;
  }

</style>