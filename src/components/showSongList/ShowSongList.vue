<template>
  <div class="container">
    <item class="item" v-for="(item,index) in itemInfo" :key="index" :singlePage="item"></item>
  </div>
</template>

<script>
import Item from './Listitem'


export default {
  props: {
    itemInfo: { //{id：歌单id picUrl:歌单封面图 playCount:播放数 name:歌单名}
      type: Array,
      default(){
        return []
      }
    }  
  },
  components: {
    Item
  },
  data() {
    return {};
  }
};
</script>

<style scoped>
  .container {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
  }

  .item {
    flex: 0 0 32%;
    overflow: hidden;
  }
</style>