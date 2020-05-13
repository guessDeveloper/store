<template>
  <div class="safe-box">
    <div class="persion-title">安全设置</div>
    <div class="safe-content">
       <div class="user">您当前的帐号：<span>Windir</span></div>
       <div class="item">
         <span class="iconfont iconxgmm"></span>
         <div class="des">
           <div class="name">登录密码</div>
           <div class="con">建议您定期更换密码，设置安全性高的密码可以使帐号更安全</div>
         </div>
         <button class="btn">修改</button>
       </div>
       <div class="item">
         <span class="iconfont iconbdsj"></span>
         <div class="des">
           <div class="name">安全手机 180******49</div>
           <div class="con">安全手机可以用于登录帐号，重置密码或其他安全验证</div>
         </div>
         <button class="btn">修改</button>
       </div>
       <div class="safe-tip">
         <h4>安全服务提示</h4>
         <ul>
           <li>· 确认您登录的是消费乐网址，注意防范进入钓鱼网站，不要轻信各种即时通讯工具发送的商品或支付链接，谨防网购诈骗</li>
           <li>· 建议您安装杀毒软件，并定期更新操作系统等软件补丁，确保帐号及交易安全</li>
         </ul>
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
@icon_color:#CFD0DF;
.safe-box{
  min-height: @persion_height;
}
.safe-content{
  padding:0 30px;
  .user{
    box-sizing: border-box;
    height:64px;
    padding-top:30px;
    font-size:12px;
    color:@subtitle_color;
    border-bottom:1px solid @class_border;
    span{
      color:@font_color;
    }
  }
  .item{
    height:133px;
    line-height: 133px;
    border-bottom: 1px solid @class_border;
    .iconfont{
      display: inline-block;
      font-size:48px;
      color:@icon_color;
      vertical-align: middle;
      margin-left:22px;
    }
    .des{
      display: inline-block;
      vertical-align: middle;
      margin-left: 40px;
      .name{
        font-size: 16px;
        line-height: 16px;
        font-weight: bold;
      }
      .con{
        font-size:12px;
        line-height: 12px;
        margin-top:15px;
        color:@subtitle_color;
      }
    }
    .btn{
      float: right;
      margin-top:47px;
      width:120px;
      height:40px;
      border: 1px solid @main;
      font-size: 14px;
      color:@main;
    }
  }
}
.safe-tip{
  box-sizing: border-box;
  height:100px;
  margin-top:30px;
  border:1px solid  rgba(243,138,29,0.2);
  border-radius: 4px;
  padding:20px;
  background:rgba(243,138,29,0.1);
  h4{
    font-size:14px;
    line-height: 14px;
  }
  ul{
    margin-top:14px;
    li{
      font-size:12px;
      color:@subtitle_color;
      line-height: 12px;
      margin-bottom: 10px;
    }
  }
}
</style>