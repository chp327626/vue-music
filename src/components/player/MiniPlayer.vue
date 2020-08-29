<template>
  <div class="player" v-show="isShow">
      <div class="music-info">
        <div class="poster" @click="showPlayer">
          <img :src="posterUrl" :class="{ pause:!playStatus}">
        </div>
        <div class="show">
          <p class="music-name" @click="showPlayer">{{ songName }} - {{ artists }}</p>
          <van-progress :percentage="percentage"
            color="red"
            stroke-width="6px"
            ref="progress"
            :show-pivot="false"
            :key="percentage"
          />
        </div>
        
      </div>
      <div class="play-control" @click="changePlay">
        <div :class="{ pause: playStatus===true }"></div>
      </div>
      <div class="play-list" @click="showList">
        <img src="@/assets/img/playlist.png">
      </div>

      <audio :src="musicUrl" 
        v-on="{
          timeupdate: timeUpdate,
          pause: audioPause,
          loadedmetadata: loadedmetadata,
          canplaythrough: canplaythrough,
          ended: ended
        }" 
        pause="audioPause" ref="player">
        你的浏览器暂时不支持H5播放
      </audio>
      <popup :isShow="isPopShow && isShow" @closeList="closeList"/>
  </div>
</template>

<script>
import { Progress } from 'vant';
import popup from 'components/playList/PlayList'

export default {
  components: {
    [Progress.name]: Progress, //注册vant组件
    popup
  },
  data() {
    return {
      audio: null, 
      duration: 0,
      currentTime: 0,
      isPopShow: false
    };
  },
  computed: {
    playStatus(){
      return this.$store.state.isPlay;
    },
    percentage(){
      return this.duration ? Number(((this.currentTime / this.duration) * 100).toFixed(1)) : 0;  //计算百分比
    },
    musicUrl(){
      return this.$store.state.musicUrl;
    },
    posterUrl(){
      return this.$store.state.picUrl;
    },
    artists(){
      return this.$store.state.artists;
    },
    songName(){
      return this.$store.state.currMusicName;
    },
    isShow(){
      return this.$store.state.duration != 0
    },
    changeNotice(){
      return this.$store.state.change;
    }
  },
  methods: {
    changePlay(){ //播放状态切换(监听播放按钮)
      this.$store.commit('switch');
    },
    timeUpdate(){
      this.$store.commit('setCurTime',this.audio.currentTime);
      this.currentTime = this.audio.currentTime;
    },
    audioPause(){ //暂停(监听非点击事件造成的停止)
      this.$store.commit('pause');
    },
    loadedmetadata(){ //当音频元数据获取完毕时，初始要播放音乐的总时长
      this.duration = this.audio.duration;
      this.$store.commit('getDuration', this.audio.duration);
    },
    showList(){ //展示播放列表
      this.isPopShow = true ;
    },
    closeList(){
      this.isPopShow = false;
    },
    canplaythrough(){   //可以完全播放时触发
      this.$toast.clear()
      this.$store.commit('play')
    },
    showPlayer(){
      this.$router.push('/player')
    },
    ended(){
      this.$store.commit('nextMusic')
    }
  },
  watch: {
    playStatus(){
      if(this.playStatus){
        this.audio.play();
      }
      else{
        this.audio.pause();
      }
    },
    changeNotice(){
      let newTime = this.$store.state.newTime
      this.audio.currentTime = newTime
    }
  },
  mounted(){
    this.audio = this.$refs.player;
  }
};
</script>

<style scoped>
  .player {
    display: flex;
    position: fixed;
    width: 100%;
    height: 55px;
    bottom: 0;
    left: 0;
    background-color: rgba(51,172,224,.9);
    z-index: 1000;
  }

  .music-info {
    display: flex;
    flex: 1;
    min-width: 100px;
  }

  .play-control,
  .play-list {
    position: relative;
    height: 100%;
    flex: 0 0 55px;
  }

  .play-control div,
  .play-list img {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 75%;
    height: 75%;
    transform: translate(-50%,-50%);
  }

  .play-control div {
    background: url("~@/assets/img/playbar.png") no-repeat;
    background-position: 3px -201px;
  }

  .play-control div.pause {
    background: url("~@/assets/img/playbar.png") no-repeat;
    background-position: 3px -162px;
  }

  .play-list img{
    width: 55%;
    height: 60%;
  }


  .music-info .poster { 
    position: relative;
    height: 100%;
    flex: 0 0 50px;
  }

  @keyframes rorate-poster {
    0%{
      transform: rotate(0deg);
    }
    100%{
      transform: rotate(359deg);
    }
  }

  .music-info .poster img{ 
    position: absolute;
    top: calc(50% - 20px);
    left: calc(50% - 20px);
    width: 40px;
    border-radius: 100%;
    animation: rorate-poster 10s linear infinite;
    animation-play-state: running;
  }

  .music-info .poster img.pause {   /*动画暂停 */
    animation-play-state: paused;
  }

  .music-info .show {
    height: 100%;
    flex: 3;
    overflow: hidden;
  }

  .show .music-name {
    display:flex;
    height: 50%;
    max-width: 300px;
    margin-bottom: 10px;
    align-items:center;
    color: #fff;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

</style>