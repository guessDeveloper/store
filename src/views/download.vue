<template>
  <div class="box">
    <img :src="url" alt="" class="img">
  </div>
</template>
<script>
export default {
  data() {
    return {
      url: ''
    }
  },
  mounted() {
    this.url = this.$route.query.imgUrl
  }
}
</script>
<style lang="less" scoped>
.box {
  width: 100%;
  background: #000;
}
.img {
  display: block;
  width: 100%;
  max-width: 640px;
}
</style>