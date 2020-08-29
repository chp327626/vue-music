<template>
  <div class="row">
    <div class="song-info" @click="playSong">
      <span class="song-name" :class="{ active:isActive }">{{ songInfo.songName }}</span>
      <span class="artist" :class="{ active:isActive }"> -{{ songInfo.artists }}</span>
    </div>
    <div class="delete" @click="deleteSong">x</div>
  </div>
</template>

<script>
export default {
  props: {
    songInfo: {   //字符串化后的对象，包含歌曲信息
      type: Object,
      default(){
        return ''
      }
    }
  },
  data() {
    return {

    };
  },
  computed: {
    isActive(){
      return this.songInfo.id == this.$store.state.currMusicId;
    }
  },
  watch: {},
  methods: {
    playSong(){
      this.$store.commit('changeSong',this.songInfo);
      this.$store.dispatch('getMusicUrl',this.songInfo.id);
    },
    deleteSong(){
      this.$store.commit('deleteSong',this.songInfo)
    }
  },
};
</script>

<style scoped>
  .row {
    display: flex;
    width: 100%;
    height: 50px;
    border-bottom:1px solid #eee;
  }

  .song-info {
    display: flex;
    flex: 0 0 80%;
    height: 100%;
    align-items: center;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  .song-info .song-name {
    font-size: 16px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  .song-info .artist {
    padding-left: 1%;
    font-size: 12px;
    color: rgba(0,0,0,.7);
  }

  .song-name.active {
    color: red;
  }
  
  .artist.active {
    color: rgba(255,0,0,.7);
  }

  .delete {
    flex: 0 0 17%;
    padding-right: 2%;
    text-align: right;
    line-height: 50px;
    color: rgba(0,0,0,.5);
  }

  
  
</style>