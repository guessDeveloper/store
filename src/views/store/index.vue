<template>
  <div class="home">
    <navBar></navBar>
    <navBottom></navBottom>
    <div class="brand-top-nav">
      <router-link tag="a" to="/store">商家中心</router-link>
      <span class="iconfont iconjiantou"></span>
      <span class="now-nav">{{title}}</span>
    </div>
    <div class="box">
      <div class="box-left">
        <left @title="changeTitle"></left>
      </div>
      <div class="box-right">
        <router-view></router-view>
      </div>
    </div>

    <div class="footer-box">
      <footerBar></footerBar>
    </div>
  </div>
</template>

<script>
import navBar from '@/components/store/storeNav'
import navBottom from '@/components/store/storeNavBar'
import footerBar from '@/components/common/footer'
import left from '@/components/store/storeLeft'
export default {
  name: 'Home',
  data() {
    return {
      title: "商家中心"
    }
  },
  mounted() {

  },
  components: {
    navBar: navBar,
    navBottom: navBottom,
    footerBar: footerBar,
    left: left
  },
  methods: {
    changeTitle(title) {

      this.title = title
    }
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
}
@media screen and(max-width:@change_width) {
  .box {
    margin-bottom: 0;
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
