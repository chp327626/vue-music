<template>
  <div class="play-page">
    <div class="bg" :style="'background-image:url('+ (picUrl || defaultPic) +')'"></div>
    <div class="head">
      <i class="iconfont icon-houtui" @click="goback"></i>
      <div class="title">
        <h4>{{ songName }}</h4>
        <span>{{ artists }}</span>
      </div>
    </div>
    <div class="poster-area">
      <img :src="picUrl || defaultPic" class="poster">
    </div>
    <lyric class="lyric" :lyric="lyric"/>
    <control />
  </div>
</template>

<script>
import { getLyric } from 'network/playerInfo'

import Lyric from "components/player/Lyric";
import Control from "components/player/Control";

export default {
  name: 'player',
  components: {
    Lyric,
    Control
  },
  data() {
    return {
      lyric: '',
      defaultPic: require('@/assets/img/disc_default.png')
    };
  },
  computed: {
    picUrl() {
      return this.$store.state.picUrl
    },
    songName(){
      return this.$store.state.currMusicName
    },
    artists(){
      return this.$store.state.artists
    },
    musicId(){
      return this.$store.state.currMusicId
    }
  },
  methods: {
    goback() {
      this.$router.go(-1);
    }
  },
  watch: {
    musicId:{
      immediate: true,
      handler: function(newVal){
        getLyric(newVal).then( res => {
          this.lyric = res.data.lrc.lyric
        }).catch( err => {
          this.lyric = '[00:00.00]暂无歌词'
        })
      }
    }
  }
};
</script>

<style scoped>
  .play-page {
    display: flex;
    flex-direction: column;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    min-height: calc(100vh);
    background-color: rgb(97, 208, 252);
    z-index: 99999;
    overflow: hidden;
  }

  .bg {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -999;
    background-size: cover;
    filter: blur(20px) contrast(30%);
    transform: scale(1.3);
  }

  .head {
    display: flex;
    height: 50px;
    width: 100%;
    margin: 10px 0 0 0;
    align-items: center;
  }

  .head i {
    flex: 0 0 50px;
    font-size: 20px;
    text-align: center;
    color: white;
  }

  .head .title {
    flex: 1;
    display: flex;
    flex-direction: column;
    max-width: 80vw;
    color: rgba(255,255,255,.8);
  }

  .title h4 {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  .title span {
    margin-top: 3px;
    font-size: 14px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    color: rgba(255,255,255,.6);
  }

  .poster-area {
    position: relative;
    width: 100%;
    height: 450px;
  }

  .poster {
    position: absolute;
    top: 10%;
    left: 50%;
    width: 342px;
    height: 342px;
    transform: translateX(-50%);
  }

  @media screen and (max-width: 390px) {
    .poster-area {
      height: 300px;
    }

    .poster {
      width: 250px;
      height: 250px;
    }
  }

  .lyric {
    flex: 1;
  }
</style>