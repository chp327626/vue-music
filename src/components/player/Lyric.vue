<!--  -->
<template>
  <div class="lyric-area" ref="wrapper">
    <div class="content" ref="content">
      <p v-for="(item,index) in lyricArr" :key="index" :class="{ active: index == activeIndex }" ref="lyricItem">
        {{ item.content }}
      </p>
    </div>
    
  </div>
</template>

<script>
import { parseLyric } from 'utils/parseLyric'

import BScroll from 'better-scroll'

export default {
  props: {
    lyric: {
      type: String,
      default(){
        return ''
      }
    }
  },
  data() {
    return {
      lyricArr: [],
      scroll: null
    };
  },
  computed: {
    activeIndex(){
      return this.lyricArr.findIndex((item, index, array) => {
        let nextLyric = array[index + 1];

        if (
          item.time <= this.$store.state.currTime &&
          (nextLyric ? this.$store.state.currTime < nextLyric.time : true)
        ) {
          return index;
        }
      });
    }
  },
  watch: {
    lyric(newVal){
      this.lyricArr = parseLyric(newVal)
    },
    activeIndex(newVal){
      let lyricItems = this.$refs.lyricItem;
      if(lyricItems != null)
        this.scroll.scrollToElement(lyricItems[newVal], 200, 0, true);
    }
  },
  activated() {
    if (!this.scroll) {
      this.scroll = new BScroll(this.$refs.wrapper);
    } else {
      this.scroll.refresh();
    }
  }
};
</script>

<style scoped>
  .lyric-area {
    position: relative;
    height: 150px;
    margin: 10px;
    text-align: center;
    overflow: hidden;
  }

  .lyric-area p {
    margin: 5px 0;
    color: rgba(255,255,255,.7);
  }

  .lyric-area .active {
    color: white;
    font-weight: 600;
  }
</style>