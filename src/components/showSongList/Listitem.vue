<template>
  <div class="list-item" @click="showDetails">
    <img v-lazy="singlePage.picUrl" :key="singlePage.picUrl">
    <span>{{ playCount }}</span>
    <p class="list-title">
        {{ singlePage.name }}
    </p>
  </div>
</template>

<script>
export default {
  props: {
    singlePage : {    //{id：歌单id picUrl:封面图 playCount:播放数 name:歌单名}
      type: Object,
      default(){
        return {}
      }
    }
  },
  data() {
    return {};
  },
  computed: {
    playCount(){
      if(this.singlePage.playCount >=100000){
        return (this.singlePage.playCount/10000).toFixed(0) + '万'
      }
      else  
        return this.singlePage.playCount
    }
  },
  methods: {
    showDetails(){
      //路由跳转
      this.$router.push({ path: `/list/${this.singlePage.id}` })
    }
  },
  watch: {}
};
</script>
<style scoped>
  .list-item {
    position: relative;
    margin-bottom: 10px;
  }

  .list-item img{
    width: 100%;
    border-radius: 7px;
  }

  .list-item span {
    position: absolute;
    top: 0;
    right: 0;
    padding-right: 5px;
    width: 100%;
    color: white;
    border-radius: 0 7px 0 0;
    background-image: linear-gradient(to right, rgba(255,255,255,0), rgba(0,0,0,.4));
    text-align: right;
    font-size: 14px;
  }

  .list-title {
    padding-top: 2%;
    padding-left: 2%;
    color: black;
    font-size: 12px;
    text-align: left;
  }

</style>