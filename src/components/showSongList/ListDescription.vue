<template>
  <div style="overflow:hidden">
    <div class="details">
      <div class="bg" :style="'background-image:url('+coverImgUrl+')'"></div>
      <i class="iconfont icon-houtui" @click="goback">返回</i>
      <div class="content">
        <img :src="coverImgUrl" alt />
        <div class="text">
          <h4>{{ title }}</h4>
          <div class="tag-box">
            <div class="tag" v-for="(item,index) in tags" :key="index">{{ item }}</div>
          </div>
        </div>
      </div>
    </div>
    <div class="description">简介: {{ description }}</div>
  </div>
</template>

<script>
export default {
  props: {
    details: {
      //title:标题  description：简介   coverImgUrl：封面url   tags：标签数组
      default() {
        return {};
      },
    },
  },
  data() {
    return {
      title: "",
      description: "",
      songIds: [],
      coverImgUrl: "",
      tags: [],
    };
  },
  methods: {
    goback() {
      this.$router.go(-1);
    },
  },
  watch: {
    details(newVal) {
      this.title = newVal.title;
      this.description = newVal.description;
      this.coverImgUrl = newVal.coverImgUrl;
      this.tags = newVal.tags;
    },
  },
};
</script>

<style scoped>
.details {
  position: relative;
  height: 200px;
  padding: 5px 10px 20px 10px;

}

.details .bg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -999;
  background-size: cover;
  filter: blur(20px) contrast(30%);
  transform: scale(1.3);
}

.details i {
  display: block;
  padding: 0 10px;
  margin: 10px 0;
  color: white;
  font-size: 20px;
}

.content {
  display: flex;
}

.content img {
  width: 150px;
  height: 150px;
}

.content .text {
  flex: 2;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.content h4 {
  display: -webkit-box;
  flex: 0 0 2.3em;
  padding-left: 1em;
  color: white;
  font-weight: 600;
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}

.tag-box {
  padding: 10px 10px;
}

.tag {
  display: inline-block;
  margin: 0 5px 5px 0;
  padding: 5px 5px;
  border: 1px solid white;
  border-radius: 37.5%;
  font-size: 16px;
  background-color: rgba(255, 255, 255, 0.5);
}

.description {
  padding: 10px 10px;
  color: black;
  background-color: #d6eef8;
  border-radius: 20px 20px 0 0;
}
</style>