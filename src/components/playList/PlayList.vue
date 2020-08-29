<template>
  <div>
    <van-popup v-model="show" position="bottom"
      closeable
      close-icon-position="top-right"
      round 
      :style="{ height: '50%' }"
      @close="closeList"
    > 
      <span class="head">播放列表({{ playList.length }})</span>
      <div class="song-container">
          <list-item v-for="item in playList" :key="item.id" :songInfo="item"/>
      </div>
    </van-popup>
  </div>
</template>

<script>
import { Popup } from 'vant';

import ListItem from './ListItem'

export default {
  props: {
    isShow: {
      type: Boolean,
      default(){
        return false
      }
    }
  },
  components: {
    [Popup.name]: Popup,
    ListItem
  },
  data() {
    return {
      show: false
    }
  },
  computed: {
    playList(){
      return this.$store.state.playList;
    }
  },
  watch: {
    isShow(){
      this.show = this.isShow
    }
  },
  //方法集合
  methods: {
    closeList(){
      this.$emit('closeList')
    }
  }
};
</script>

<style scoped>
  .head {
    display: block;
    margin-top: 20px;
    text-align: center;
    color: #666;

  }

  .song-container {
    margin: 10px 1%;
    margin-bottom: 20px;
  }

  

</style>