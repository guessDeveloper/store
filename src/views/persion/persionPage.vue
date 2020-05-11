<template>
  <div class="box">
     <div class="title">我的账户</div>
     <div class="content">
        <div class="persion-box">
           <div class="head-img">

           </div>
           <div class="user-msg">
              <div class="line"><span class="name">昵称：</span>直播购物达人<span class="change">修改昵称</span></div>
              <div class="line"><span class="name">手机号：</span>15255555555</div>
           </div>
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
.box{
  min-height: 660px;
}
.title{
  text-align: left;
  font-size:20px;
  line-height: 60px;
  padding-left:30px;
  border-bottom:@class_border;
}
.content{
  padding:0 30px;
}
.persion-box{
  .clear();
  .head-img{
    float: left;
    width:80px;
    height:80px;
    background:#ccc;
    border-radius: 80px;
    overflow: hidden;
  }
  .user-msg{
    float: left;
    .line{
      
    }
  }
}
</style>