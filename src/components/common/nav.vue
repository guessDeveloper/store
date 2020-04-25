<template>
  <div class="nav ">
    <div class="nav-box clear">
       <div class="tip">优乐兑APP上线了，帮助商家解决客户流量问题</div>
       <div class="nav-right">
          <a class=""></a>
          <a href="">请先登录</a>
          <a href="">免费注册</a>
          <a href="" class="help">帮助中心</a>
       </div>
    </div>
  </div>
</template>
<script>
export default {
  data(){
    return{

    }
  }
}
</script>
<style lang="less" scoped>
@import '../../assets/less/common.less';
.nav{
  width:100%;
  height:32px;
  background:@nav_bg;
  .nav-box{
    width:@max-width;
    height:100%;
    overflow: hidden;
    margin:0 auto;
    background:@nav_bg;
    .tip{
      float: left;
      font-size:12px;
      color:#fff;
      line-height:32px;
    }
    .nav-right{
      float: right;
      font-size:0;
      a{
        float: left;
        margin-top:10px;
        height: 12px;
        line-height: 12px;
        font-size: 12px;
        color:#fff;
        padding:0 12px;
        border-left:1px solid @nav-border;
        &.help{
          padding-right:0;
        }
      }
    }
  }
}
</style>