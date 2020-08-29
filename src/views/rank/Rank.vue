<!--  -->
<template>
  <div class="rank">
    <div class="hotbg">
      <span class="update-time">更新日期: {{ toDay }}</span>
      <div class="hot-img"></div>
    </div>
    <div class="song-rank">
      <song-item v-for="(item,index) in popularSong" :key="item.id" :singleSong="item" :flag="2">
        <div class="rank-index-box"><span>{{ index+1 }}</span></div>
      </song-item>
    </div>
  </div>
</template>

<script>
import { getSongListDetail } from 'network/rank'
import SongItem from 'components/newSong/SongItem'

export default {
  name: 'rank',
  components: {
    SongItem
  },
  data() {
    return {
      popularSong: []
    };
  },
  computed: {
    toDay(){
      let date = new Date();
      return date.getMonth()+ 1 + '月' + date.getDate() + '日';
    }
  },
  created(){
    this.$toast.loading({
      message: '加载中...',
      forbidClick: true
    })
    //获取热歌榜
    getSongListDetail(19723756).then( res => {
      let data = res.data.playlist.tracks;
      this.popularSong = [...data]
      this.$toast.clear()
    }).catch( err => {
      this.$toast.fail('加载失败');
    })
  }
};
</script>

<style scoped>
  .hotbg{
    position: relative;
    width: 100%;
    height: 180px;
    background: url('~@/assets/img/hot_bg.jpg') no-repeat;
    background-size: 100% 100%; 
  }

  .hotbg .update-time {
    position: absolute;
    bottom: 15%;
    left: 5%;
    color: rgba(255,255,255,.9);
    font-size: 14px;
  }

  .hotbg .hot-img {
    position: absolute;
    top: 30%;
    left: 5%;
    width: 142px;
    height: 67px;
    background-image: url(/img/hot_icon.5207a28c.png);
    background-position: -24px -30px;
    background-size: 166px 97px;
  }

  .playall {
    box-sizing: border-box;
    width: 100%;
    height: 20px;
    padding: 0 5%;
    line-height: 50px;
    border-radius: 30px 30px 0 0;
    background-image: linear-gradient(to bottom, skyblue, rgba(123, 197, 247, 0.932));
  }

  .song-rank {
    width: 100%;
    background-image: linear-gradient(to bottom, rgba(123, 197, 247, 0.932), rgba(89, 206, 252, 0.973));
  }

  .rank-index-box {
    position: relative;
    width: 40px;
    height: 100%;
  }

  .rank-index-box span {
    display: block;
    position: absolute;
    top: 50%;
    left: 50%;
    color: rgba(255,255,255,.8);
    font-size: 20px;
    transform: translate(-50%,-50%);
  }

  
</style>