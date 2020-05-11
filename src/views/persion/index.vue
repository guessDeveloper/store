<template>
  <div class="home">
    <navBar></navBar>
    <navBottom></navBottom>
    <div class="brand-top-nav">
        <router-link tag="a" to="/">首页</router-link>
        <span class="iconfont iconjiantou"></span>
        <span class="now-nav">优选推荐</span>
      </div>
    <div class="box">
      <div class="box-left">
          <ul>
            <li> 我的账号</li>
          </ul>
      </div>
      <div class="box-right">
        <router-view></router-view>
      </div>
    </div>
    
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
.box{
  width:@max-width;
  margin:0 auto;
  .clear();
  .box-left{
    float: left;
    width:190px;
    height:100%;
    background:#fff;
  }
  .box-right{
    float:right;
    width:990px;
    height:100%;
    background:#fff;
    
  }
}

</style>
