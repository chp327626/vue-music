<template>
  <div class="control-area">
      <div class="slider-area">
        <span>{{ nowMinutes }}:{{ nowSeconds }}</span>
        <div class="slider">
          <slider :value="value" @changeTime="changeTime"/>
        </div>
        <span>{{ totalMinutes }}:{{ totalSeconds }}</span>
      </div>
      <div class="button">
        <i class="iconfont icon-shangyishoushangyige" @click="prev"></i>
        <i class="iconfont" :class="{ 'icon-bofang': !isPlay, 'icon-zanting':isPlay}" @click="changePlay" style="font-size: 50px"></i>
        <i class="iconfont icon-xiayigexiayishou" @click="next"></i>
      </div>
  </div>
</template>

<script>
import Slider from 'components/slider/Slider'

import { getSecond,getMinute } from 'utils/parseTime'

export default {
  components: {
    Slider
  },
  data() {
    return {};
  },
  computed: {
    value(){
      return this.$store.state.duration ? Number(((this.$store.state.currTime / this.$store.state.duration) * 100).toFixed(1)) : 0;  //计算百分比
    },
    isPlay(){
      return this.$store.state.isPlay;
    },
    nowSeconds(){
      return getSecond(this.$store.state.currTime)
    },
    nowMinutes(){
      return getMinute(this.$store.state.currTime)
    },
    totalSeconds(){
      return getSecond(this.$store.state.duration)
    },
    totalMinutes(){
      return getMinute(this.$store.state.duration)
    }
  },
  methods: {
    changePlay(){
      this.$store.commit('switch');
    },
    changeTime(percentage){
      let newTime = this.$store.state.duration * (percentage / 100)
      this.$store.commit('changeTime',newTime)
    },
    prev(){
      this.$store.commit('prevMusic')
    },
    next(){
      this.$store.commit('nextMusic')
    }
  }
};
</script>


<style scoped>
  .slider-area {
    height: 15px;
    display: flex;
    justify-content: space-between;
    align-content: center;
    padding: 10px 0;
  }

  .slider-area .slider {
    flex: 1;
    height: 100%;
    padding: 8px 15px;
  }

  .slider-area span {
    color: rgba(255,255,255,.8);
    padding: 0 2px;
  }

  .button {
    display: flex;
    height: 80px;
    justify-content: center;
  }

  .button i {
    flex: 1;
    height: 100%;
    color: rgba(255,255,255,.8);
    font-size: 30px;
    line-height: 80px;
    text-align: center;
  } 
</style>