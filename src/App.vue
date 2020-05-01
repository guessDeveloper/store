<template>
  <div id="app">
    <router-view></router-view>
    <fixRight></fixRight>
  </div>
</template>

<script>
import fixRight from '@/components/common/custoer-service'
export default {
  name: 'app',
  components: {
    fixRight:fixRight,
  }
}
</script>

<style lang="less">
@import './assets/less/common.less';
@import './assets/less/reset.less';
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}
.brand-top-nav{
  width:@max-width;
  margin:0 auto;
  text-align: left;
  line-height: 14px;
  a{
    font-size:12px;
    color:@font_color;
  }
 
  .now-nav{
    color:@placeholder_color;
  }
}
</style>
