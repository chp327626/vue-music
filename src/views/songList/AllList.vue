<template>
  <div class="box">
    <scroll class="wrapper" @pullingUp="getMore" ref="scroll">
      <h4>全部歌单</h4>
      <song-list :itemInfo="songList" />
      <p v-show="loading">{{ loadStatus }}</p>
    </scroll>
  </div>
</template>

<script>
import { getTopList } from "network/allList";

import SongList from "components/showSongList/ShowSongList";
import Scroll from "components/scroll/Scroll";

export default {
  name: 'allList',
  components: {
    SongList,
    Scroll,
  },
  data() {
    return {
      songList: [], //{id：歌单id picUrl:歌单封面图 playCount:播放数 name:歌单名}
      page: 1,
      loading: false,
      loadStatus: ''
    };
  },
  methods: {
    getMore(isLoading) {
      this.loading = true
      this.loadStatus = '加载中...'
      this.page++
      getTopList(this.page).then( res => {
        let data = res.data.playlists;
        for (let i = 0; i < data.length; i++) {
          this.songList.push({
            id: data[i].id,
            picUrl: data[i].coverImgUrl,
            playCount: data[i].playCount,
            name: data[i].name,
          });
        }
        this.$refs.scroll.finishPullUp()
        this.$refs.scroll.refresh()
        this.loading = false
      }).catch( err => {
          this.loadStatus = '加载失败'
          this.$refs.scroll.finishPullUp()
      });
    }
  },
  created() {
    getTopList()
      .then( res => {
        let data = res.data.playlists;
        for (let i = 0; i < data.length; i++) {
          this.songList.push({
            id: data[i].id,
            picUrl: data[i].coverImgUrl,
            playCount: data[i].playCount,
            name: data[i].name,
          });
        }
      })
      .catch( err => {
        console.log(err);
      });
  },
};
</script>

<style scoped>
.wrapper {
  height: 85vh;
  overflow: hidden;
}

h4 {
  font-weight: 400;
  margin: 10px 0;
}

h4::before {
  content: "";
  display: inline-block;
  width: 10px;
  height: 20px;
  margin-right: 5px;
  border-right: 5px solid red;
  vertical-align: sub;
}

.wrapper p {
  text-align: center;
  color: #666;
}

.container {
  margin: 0 5px;
}
</style>