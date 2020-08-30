<template>
  <div class="home">
    <navBar></navBar>
    <navBottom></navBottom>

    <keep-alive>
      <router-view v-if="$route.meta.keepLive"></router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.keepLive"></router-view>
    <div class="footer-box">
      <footerBar></footerBar>
    </div>
    <div class="phone-footer-box">
      <phoneFooter></phoneFooter>
    </div>
  </div>
</template>

<script>
import navBar from '@/components/common/nav'
import navBottom from '@/components/common/nav-bar'
import footerBar from '@/components/common/footer'
import phoneFooter from '@/components/common/phoneFooter'
export default {
  name: 'Home',
  data() {
    return {

    }
  },
  mounted() {

  },
  components: {
    navBar: navBar,
    navBottom: navBottom,
    footerBar: footerBar,
    phoneFooter: phoneFooter
  }
}
</script>
<style lang="less" scoped>
.home {
  position: relative;
  height: 100%;
  min-height: 100vh;
  .footer-box {
    position: absolute;
    width: 100%;
    left: 0;
    bottom: 0;
  }
}
//底部footer
.phone-footer-box {
  display: none;
  @media screen and(max-width:@change_width) {
    & {
      display: block;
      width: 100%;
      height: 56 / @p;
    }
  }
}
</style>
