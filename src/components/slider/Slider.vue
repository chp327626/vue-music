<template>
  <div>
    <van-slider v-model="percentage" @change="changeTime"
      bar-height="2px"
      button-size="12px"
      active-color="red"
    />
  </div>
</template>

<script>
import { Slider } from "vant";

export default {
  props: {
    value: {
      type: Number,
      default() {
        return 0;
      },
    }
  },
  components: {
    [Slider.name]: Slider,
  },
  data() {
    return {
      percentage: 0,
    };
  },
  computed: {},
  methods: {
    changeTime(){
      this.$emit('changeTime',this.percentage)
    }
  },
  watch: {
    value(newVal) {
      this.percentage = newVal;
    }
  }
  
};
</script>

<style scoped>
</style>