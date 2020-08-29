<template>
  <div class="search-tag" @click="sendTag">
    {{ hotWord }}
  </div>
</template>

<script>
export default {
  props: {
    hotWord: {
      type: String,
      default(){
        return ''
      }
    }
  },
  data() {
    return {};
  },
  methods: {
    sendTag(){
      this.$emit('sendTag',this.hotWord)
    }
  }
};
</script>

<style scoped>
  .search-tag {
    display: inline-block;
    height: 32px;
    padding: 0 5%;
    margin: 0 10px 10px 0;
    background-color: rgba(255,255,255,.1);
    border: 1px solid #eee;
    border-radius: 16px;
    color: rgba(255,255,255,.8);
    line-height: 32px;
  }
</style>