<template>
  <div>
    <song-item v-for="item in newSong" :key="item.id" :singleSong="item" :flag="flag"/>
  </div>
</template>

<script>
import SongItem from './SongItem'

export default {
  props: {
    newSong: { 
      type: Array,
      default(){
        return []
      }
    },
    flag: {
      type: Number,
      default(){
        return 0
      }
    }
  },
  components: {
    SongItem
  },
  data() {
    return {
      
    };
  }
};
</script>
<style scoped>
</style>