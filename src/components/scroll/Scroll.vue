<template>
  <div ref="wrapper">
    <div>
      <slot></slot>
    </div>
  </div>
</template>

<script>
import Bscroll from "better-scroll";

export default {
  data() {
    return {
      scroll: null
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    __initScroll() {
      // 初始化BScroll对象
      if (!this.$refs.wrapper) return;
      this.scroll = new Bscroll(this.$refs.wrapper, {
        click: true,
        pullUpLoad: {
          threshold: -50,
        },
        mouseWheel: true
      });

      // 监听上拉到底部
      this.scroll.on("pullingUp", () => {
        this.$emit("pullingUp");
      });
    },
    finishPullUp() {
		  this.scroll.finishPullUp()
    },
    refresh(){
      this.scroll.refresh()
    }
  },
  mounted() {
    setTimeout(this.__initScroll,20)
  }
};
</script>

<style scoped>
</style>