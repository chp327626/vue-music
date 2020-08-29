<template>
  <div class="search-page">
    <input-area v-on="{sendKeyWords:getKeywords,clearAll:clearAll}" :hotTag="hotTag"/>
    <div class="hot-search" v-show="searchRes.length==0">
      <h3>热门搜索</h3>
      <div class="hot-word">
        <hot-search v-for="(item,index) in hotWord" :key="index" :hotWord="item" @sendTag="getHotTag"/>
      </div>
      
    </div>
    <song-item v-for="item in searchRes" :key="item.id" :singleSong="item" :flag="2"/>
  </div>
</template>

<script>
import { search,hotSearch } from 'network/search'

import InputArea from 'components/search/SearchInput'
import SongItem from 'components/newSong/SongItem'
import HotSearch from 'components/search/SearchUnit'

export default {
  name: 'search',
  components: {
    InputArea,
    SongItem,
    HotSearch
  },
  data() {
    return {
      searchRes: [],
      hotWord: [],
      hotTag: ''
    };
  },
  methods: {
    getKeywords(keywords){
      if(keywords!=''){
        this.$toast.loading({
          message: '加载中...',
          forbidClick: true
        })
        search(keywords).then( res => {
          this.searchRes = []
          let data = res.data.result.songs;
          this.searchRes = [...data]
          this.$toast.clear()
        }).catch( () => {
          this.$toast.fail('加载失败')
        })
      }
    },
    clearAll(){
      this.searchRes = [];
      this.hotTag = '';
    },
    getHotTag(hotTag){
      this.hotTag = hotTag;
    }
  },
  created(){
    hotSearch().then( res => {
      let data = res.data.result.hots;
      for(let i=0;i<data.length;i++){
        this.hotWord.push(data[i].first)
      }
    }).catch( err => {
      console.log(err);
    })
  }
};
</script>
<style scoped>
  .search-page {
    position: absolute;
    display: flex;
    top: 0;
    left: 0;
    width: 100%;
    min-height: calc(100vh);
    padding-bottom: 55px;
    flex-direction: column;
    background-color: rgb(73, 192, 240);
    z-index: 999;
  }

  .hot-search {
    width: 90%;
    margin: 20px 0;
    padding: 0 5%;
  }

  h3 {
    margin: 15px 0 15px -5px;
    color: white;
    font-weight: 400;
  }

  .hot-word {
    display: flex;
    flex-wrap: wrap;
  }

</style>