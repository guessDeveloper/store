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
      <a href="" class="regester">注册</a>
      <a class="login">登录</a>
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
    .login{
      display: none;
    }
    .regester{
      display: none;
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
@media screen and(max-width:@change_width){
  .nav{
    width:100%;
    height:40/@p;
    background:@body_color;
    .nav-box{
      box-sizing: border-box;
      width:100%;
      padding:0 15px;
      background:@body_color;
      .tip{
        width:204/@p;
        font-size:12px;
        line-height: 40/@p;
        color:@subtitle_color;
        .overTextOne();
      }
      .nav-right{
        display: none;
      }
      .login,.regester{
        box-sizing: border-box;
        display: block;
        float: right;
        width:44/@p;
        height:24/@p;
        margin-right:6/@p;
        margin-top:8/@p;
        text-align: center;
        line-height: 22/@p;
        color:@main;
        font-size:12px;
        border:1px solid @main;
        border-radius: 4/@p;
      }
    }
  }
}
</style>