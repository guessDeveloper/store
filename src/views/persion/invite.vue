<template>
  <div class="invite-box">
    <div class="persion-title">
      邀请有礼
    </div>
    <div class="invite">
      <div class="user-link">
         <span class="iconfont iconyqyl"></span><span class="name">我的邀请链接：</span><span class="link">https://youledui.com/shop/view_shop.htm?spm=a21bo.2017.201863</span><button class="copy">复制</button>
      </div>
      <div class="invite-list-title">
        邀请记录
      </div>
      <div class="invite-list">
        <div class="item">
           <div class="user"><span class="header"><img src="" alt=""></span>母婴类购物达人</div><div class="phone">180****1849</div><div class="time">180****1849</div>
        </div>
        
      </div>
      <div class="empty">
          <span class="iconfont iconzwyqzwt"></span>
          <div class="name"> 暂无邀请记录</div>
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
.invite-box{
  width:100%;
  min-height:660px;
}
.invite{
  padding:0px 30px;
  .user-link{
    height:106px;
    line-height: 106px;
    text-align: left;
    padding-left:29px;
    border-bottom:1px solid @class_border;
    .iconfont{
      float: left;
      font-size:42px;
      color:@class_border;
    }
    .name{
      margin-left:18px;
      font-size:12px;
      line-height: 106px;
      margin-right:4px;
    }
    .link{
      display: inline-block;
      width:430px;
      height:34px;
      padding:0 10px;
      overflow: hidden;
      line-height: 34px;
      font-size:12px;
      background:@class_border;
      border-radius: 4px;
      vertical-align:middle;
    }
    .copy{
      width:70px;
      height:34px;
      margin-left:30px;
      color:@main;
      font-size:12px;
      border:1px solid @main;
      border-radius: 34px;
    }
  }
  .invite-list-title{
    padding:40px 0 30px 0;
    font-size:16px;
    text-align: left;
    border-bottom:1px solid @class_border;
  }
  .invite-list{
    .item{
      height:70px;
      border-bottom:1px solid @class_border;
      div{
        float: left;
        width:33.33%;
        font-size:12px;
        line-height: 70px;
      }
      .user{
        font-size:12px;
        text-align: left;
        .header{
          text-align: left;
          display: inline-block;
          width:30px;
          height:30px;
          margin-right:8px;
          overflow: hidden;
          background:#ccc;
          border-radius: 30px;
          vertical-align: middle;
        }
      }
      .phone{
        text-align: center;
      }
      .time{
        text-align: right;
        font-size:12px;
        color:@subtitle_color;
      }
    }
  }
}
.empty{
  text-align: center;
  .iconfont{
    display: block;
    margin:0 auto;
    font-size:94px;
    color:@placeholder_color;
  }
  .name{
    font-size:14px;
    line-height: 14px;
    color:@subtitle_color;
  }
}
</style>