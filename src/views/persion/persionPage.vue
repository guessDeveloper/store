<template>
  <div class="pesionbox">
     <div class="title">我的账户</div>
     <div class="content">
        <div class="persion-box">
           <div class="head-img">

           </div>
           <div class="user-msg">
              <div class="line top"><span class="name">昵称：</span>直播购物达人<span class="change">修改昵称</span></div>
              <div class="line bottom"><span class="name">手机号：</span>15255555555</div>
           </div>
           <div class="score-box">
              <div class="first item">
                <div class="name">累计获得积分</div>
                <div class="num">1000</div>
              </div>
                <div class="second item">
                <div class="name">我的积分</div>
                <div class="num">1000</div>
              </div>
                <div class="three item">
                <div class="name">累计使用积分</div>
                <div class="num">1000</div>
              </div>
           </div>
          
        </div>
         <div class="set">
            <span class="iconfont iconzhushi"></span> 请完善您的信息：您的手机号尚未绑定！<a href="">立即设置</a>
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
.pesionbox{
  width:100%;
  min-height: 660px;
}
.title{
  text-align: left;
  font-size:20px;
  line-height: 60px;
  padding-left:30px;
  border-bottom:1px solid @class_border;
}
.content{
  padding:0 30px;
}
.set{
  text-align: left;
  height:30px;
  border:1px solid #F38A1D;
  background:rgba(243,138,29,0.1);
  font-size:12px;
  color:#000;
  margin-top:30px;
  padding-left:10px;
  border-radius: 4px;
  line-height: 30px;
  .iconfont{
    color:@main;
  }
  a{
    color:@main;
  }
}
.persion-box{
    margin-top:30px;
    border-bottom:1px solid @class_border;
    padding-bottom:30px;
    height:80px;
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
      text-align: left;
      line-height: 12px;
      &.top{
        margin-top:22px;
      }
      &.bottom{
        margin-top:15px;
      }
      .name{
        display:inline-block;
        text-align: right;
        width:100px;
        color:@subtitle_color;
      }
      .change{
        margin-left:50px;
        color:@main;
        cursor: pointer;
      }
    }
  }
  .score-box{
    float: right;
    text-align: left;
    .clear();
    .item{
      float: left;
    }
    .first{
      width:162px;
    }
    .second{
      width:162px;
    }
    .three{
      width:120px;
    }
    .name{
      margin-top:22px;
      font-size:12px;
      color:@subtitle_color;
    }
    .num{
      font-size:16px;
      margin-top:13px;
      line-height: 12px;
      font-weight: bold;
    }
  }
}
</style>