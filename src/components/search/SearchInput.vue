<template>
  <div class="search-nav">
    <div class="goback" @click="goback">
      <i class="iconfont icon-houtui"></i>
    </div>
    <input type="text" placeholder="请输入乐曲名" v-model="searchInfo"/>
  </div>
</template>

<script>
export default {
  props: {
    hotTag: {
      type: String,
      default(){
        return ''
      }
    }
  },
  data() {
    return {
      timer: null, //防抖定时器
      searchInfo: '',
      isDebounce: true, //是否开启防抖
    };
  },
  methods: {
    debounce(str){  //防抖函数
      if(this.timer!=null){
        clearTimeout(this.timer);
      }
      if(this.isDebounce){
        this.timer = setTimeout( () =>{   //注意this指向
          this.$emit('sendKeyWords',str);
        }, 1000)
      }
      else{
        this.isDebounce = true;
        this.$emit('sendKeyWords',str);
      }
    },
    goback(){
      this.$router.go(-1);
    }
  },
  watch: {
    searchInfo(newVal){
      this.debounce(newVal)
      if(newVal==''){
        this.$emit('clearAll')
      }
    },
    hotTag(){
      this.searchInfo = this.hotTag
      this.isDebounce = false;
    }
  }
};
</script>

<style scoped>
  .search-nav {
    display: flex;
    width: 100%;
    height: 65px;
  }

  .goback {
    display: flex;
    flex: 0 0 50px;
    justify-content: center;
    align-items: center;
  }

  .goback i {
    font-size: 30px;
    color: #eee;
  }

  .input-area {
    flex: 0 0 75%;
  }

  input {
    flex: 0 0 85%;
    width: 100%;
    height: 100%;
    padding-left: 1%;
    border: none;
    border-bottom: 2px solid rgba(255,255,255,.4);
    background-color: transparent;
    color: rgba(255,255,255,.8);
    font-size: 25px;
  }

  input::-webkit-input-placeholder { /* WebKit browsers 适配谷歌 */
    color: rgba(255,255,255,.4);
  }
  input:-moz-placeholder { /* Mozilla Firefox 4 to 18 适配火狐 */
      color: rgba(255,255,255,.4);
  }
  input::-moz-placeholder { /* Mozilla Firefox 19+ 适配火狐 */
      color: rgba(255,255,255,.4);
  }
  input:-ms-input-placeholder { /* Internet Explorer 10+  适配ie*/
      color: rgba(255,255,255,.4);
  }
</style>