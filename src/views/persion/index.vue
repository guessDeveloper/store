<template>
  <div class="home">
    <navBar></navBar>
    <navBottom></navBottom>
    <div class="brand-top-nav">
      <router-link tag="a" to="/">首页</router-link>
      <span class="iconfont iconjiantou"></span>
      <span class="now-nav">{{title}}</span>
    </div>
    <div class="box">
      <div class="box-left">
        <left @navChange="navChange"></left>
      </div>
      <div class="box-right">
        <router-view></router-view>
      </div>
    </div>

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
import left from '@/components/persion/commonLeft'
export default {
  name: 'Home',
  data() {
    return {
      title: ''
    }
  },
  mounted() {

  },
  methods: {
    navChange(title) {
      this.title = title
    }
  },
  components: {
    navBar: navBar,
    navBottom: navBottom,
    footerBar: footerBar,
    left: left,
    phoneFooter: phoneFooter
  }
}
</script>
<style lang="less" scoped>
.box {
  width: @max-width;
  margin: 0 auto 100px;
  .clear();
  .box-left {
    float: left;
    width: 190px;
    height: 100%;
    background: #fff;
  }
  .box-right {
    float: right;
    width: 990px;
    height: 100%;
    background: #fff;
  }
  @media screen and(max-width:@change_width) {
    width: 100%;
    .box-left {
      display: none;
    }
    .box-right {
      width: 100%;
      margin-top: 10px;
    }
  }
}
@media screen and(max-width:@change_width) {
  .box {
    margin-bottom: 0;
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
</style>
