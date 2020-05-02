<template>
  <div class="cuser-box">
     <span class="iconfont iconkefu"></span>
     <div class="name">在线客服</div>
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
.cuser-box{
  position:fixed;
  width:60px;
  height:60px;
  right:10px;
  bottom:50px;
  background:#fff;
  z-index: 10;
  .iconfont{
    display: block;
    font-size:28px;
  }
  .name{
    font-size:12px;
    color:#666;
    margin-top:-3px;
  }
   @media screen and(max-width:@change_width){
     &{
       width:44px;
       height:44px;
       right:0;
       bottom:150px;
       color:#fff;
       font-size:32px;
       line-height: 44px;
       background:@service_color;
       .name{
         display: none;
       }
       .iconfont{
         font-size:30px;
       }
     }
   }
}
</style>