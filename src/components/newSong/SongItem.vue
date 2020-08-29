// {
//           id: 
//           picUrl: 
//           name: 
//           artists: 
//           album:
//           st:
//           fee: 
// }

<template>
  <div class="single-song" @click="playSong">
    <slot></slot>
    <div class="song-info">
      <div class="song-name">{{ songName }}</div>
      <div class="singer-info">{{ artists }} - {{ album }} </div>
    </div>
    <div class="play-icon"><img src="@/assets/img/play_btn.png"></div>
  </div>
</template>

<script>
import { parseSongInfo } from 'utils/parseSongInfo'

export default {
  props: {
    singleSong:{  
      type: Object,
      default(){
        return {}
      }
    },
    flag: {
      type: Number,
      default(){
        return 0
      }
    }    
  },
  data() {
    return {
      id: 0,        //歌曲id
      picUrl: '',   //封面图
      songName: '', //歌曲名
      ar: '',       //歌手
      album: '',    //专辑
      st: 0,       //版权
      fee: 0      //免费
    };
  },
  computed: {
    artists(){  //拼接所有歌手名
      let artists = this.ar;
      let artistsNames = [];
      for(let i=0;i< artists.length;i++){
        artistsNames.push(artists[i].name);
      }
      return artistsNames.join('/');
    }

  },
  methods: {
    playSong(){
      if(this.st == -200 ){
        this.$toast.fail('暂无版权')
      }
      else if( this.fee != 0 && this.fee!= 8 ){
        this.$toast.fail('仅限vip')
      }
      else{
        let info = {
          id: this.id,
          songName: this.songName,
          picUrl: this.picUrl,
          artists: this.artists
        }
        this.$store.commit('changeSong',info);  //更新store中正在播放歌曲信息
        this.$toast.loading({
          message: '加载中',
          duration: 2000
        })
      }
    }
  },
  watch: {
    singleSong: {
      handler: function() {
        let res = parseSongInfo(this.singleSong,this.flag)
        this.id = res.id;
        this.picUrl = res.picUrl;
        this.songName = res.songName;
        this.ar = res.artists;
        this.st = res.st;
        this.fee = res.fee;
        this.album = res.album
      },
      immediate: true
    }
  }
};
</script>

<style scoped>
  .single-song {
    display: flex;
    height: 50px;
    border-bottom: 1px solid rgb(172, 170, 170);
  }

  .song-info {
    display: flex;
    width: 89%;
    height: 100%;
    margin-left: 1%;
    flex-direction: column;
    justify-content: center;
    overflow: hidden;
  }


  .song-info .song-name {
    padding-bottom: 3px;
    font-size: 16px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  .song-info .singer-info {
    font-size: 13px;
    color: rgba(0,0,0,.6);
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  .singer-info::before {
    content: '';
    display: inline-block;
    width: 12px;
    height: 8px;
    padding-right: 5px;
    background: url('~@/assets/img/hot_icon.png') no-repeat;
    background-size: 166px 97px;
  }

  .single-song .play-icon {
    position: relative;
    width: 50px;
    height: 100%;
  }

  .single-song .play-icon img {
    position: absolute;
    width: 50%;
    max-width: 50px;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
  }


</style>