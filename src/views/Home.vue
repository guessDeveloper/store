<template>
  <div class="home">
    <navBar></navBar>
    <navBottom></navBottom>
    <keep-alive>
      <router-view v-if="$route.meta.keepLive"></router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.keepLive"></router-view>
    <footerBar></footerBar>
  </div>
</template>

<script>
import  navBar from '@/components/common/nav'
import  navBottom from'@/components/common/nav-bar'
import footerBar from '@/components/common/footer'
export default {
  name: 'Home',
  data(){
    return{
 
    }
  },
  mounted(){
     
  },
  components: {
    navBar:navBar,
    navBottom:navBottom,
    footerBar:footerBar,
  }
}
</script>
<style lang="less" scoped>
.home{
  min-height: 100vh;
}
</style>
