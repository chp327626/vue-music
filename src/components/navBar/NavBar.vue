<template>
  <div class="box">
    <div class="nav-bar">
      <div class="left"><a href="https://github.com/chp327626/vue-musicPlayer"><img src="@/assets/img/github.png"></a></div>
      <div class="center">
        <router-link v-for="(item,index) in menu" :key="index" :to="item[1]" class="link">{{ item[0] }}</router-link>
      </div>
      <div class="right" ><img src="@/assets/img/search.png" @click="search"></div>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      menu: [['歌单','/allList'],['推荐','/commends'],['排行','/rank']],
      isActive: 1
    };
  },
  computed: {},
  methods: {
    itemClick(index){
      this.isActive = index;
      this.$router.push(this.menu[index][1]);
    },
    search(){
      this.isActive = -1;
      this.$router.push('/search');
    }
  },
};
</script>
<style scoped>
  .box {
    height: 62px;
    margin-bottom: 2px;
  }

  .nav-bar {
    position: fixed;
    top: 0;
    left: 0;
    display: flex;
    width: 100%;
    background-color: #2d89cc;
    text-align: center;
    z-index: 1;
  }

  .left,
  .right {
    position: relative;
    width: 60px;
    border-radius: 100%;
  }

  .center {
    display: flex;
    flex: 1;
    justify-content: center; 
  }

  .center .link {
    width: 70px;
    color: #b6d6eb;
    line-height: 62px;
    transition: all .3s;
    border-bottom: 2px solid transparent;
  }

  .left img,
  .right img {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 20px;
    transform: translate(-50%,-50%);
  }
  
  .center .link.router-link-active {
    color: rgba(255,255,255,.9);
    border-bottom-color: #fff;
    font-size: 25px;
  }

</style>