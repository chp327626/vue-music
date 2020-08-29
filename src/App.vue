<template>
  <div id="app">
    <nav-bar/>
    <keep-alive :include="['allList','player']">
      <router-view/>
    </keep-alive>
    <mini-player/>
    <div class="blank" v-show="isPlay"></div>
  </div>
</template>

<script>
import NavBar from 'components/navBar/NavBar'
import MiniPlayer from 'components/player/MiniPlayer'

export default {
  components: {
    NavBar,
    MiniPlayer
  },
  computed: {
    isPlay(){
      return this.$store.state.duration != 0;
    }
  }
}
</script>

<style>
  @import url('assets/css/base.css');

  #app {
  position: relative;
  }

  .blank {
    height: 55px;
  }
</style>
