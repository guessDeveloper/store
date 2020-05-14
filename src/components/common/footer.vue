<template>
  <div class="footer" :class="{login:isLogin}">
    <div class="footer-top">
       <div class="link-box">
         <div class="top"> 
         <a href="">关于我们</a>
         <span>|</span>
         <a href="">帮助中心</a>
         <span>|</span>
         <a href="">售后服务</a>
         <span>|</span>
         <a href="">配送与验收</a>
         <span class="last">|</span>
         </div>
         <div class="bottom">
         <a href="">商务合作</a>
         <span>|</span>
         <a href="">企业采购</a>
         <span>|</span>
         <a href="">开放平台</a>
         <span>|</span>
         <a href="">搜索推荐</a>
         <span>|</span>
         <a href="">友情链接</a>
         </div>
       </div>
    </div>
    <div class="footer-bottom"><div class="box"><a >CopyRight © 消费乐2015</a></div></div>
  </div>
</template>
<script>
export default {
  props:{
    isLogin:{
      type:Boolean,
      default:false
    }
  }
}
</script>
<style lang="less" scoped>
.footer{
  width:100%;
  text-align: center;
  &.login{
    .footer-top{
      background:none;
      .link-box{
        a{
          color:@subtitle_color;
          opacity: 1;
        }
      }
    }
    .footer-bottom{
      background:none;
      .box{
        a{
          color:@placeholder_color;
          opacity: 1;
        }
      }
    }
  }
  .footer-top{
    width:100%;
    height:95px;
    background:@footer_top;
    line-height: 95px;
    font-size:0;
    .link-box{
      display: inline-block;
      width:@max-width;
      a{
        font-size:12px;
        color:#F8F8F8;
        opacity: .35;
      }
      span{
        font-size:14px;
        color:#F8F8F8;
        padding:0 8px;
        opacity: .35;
      }
      .top{
        display: inline-block;
      }
      .bottom{
        display: inline-block;
      }
    }
  }
  .footer-bottom{
    width:100%;
    height:45px;
    text-align: center;
    line-height: 45px;
    background:@footer_bottom;
    .box{
      width:@max-width;
      margin:0 auto;
    }
    a{
      font-size:12px;
      color:#fff;
      opacity:.2;
    }
  }
  @media screen and(max-width:@change_width){
    &{
      overflow: hidden;
    }
    .footer-top{
      height:130px;
      
      line-height: 35px;
      .link-box{
        width:100%;
        a{
          word-break:keep-all;
        }
        .top{
          margin-top:30px;
          display: block;
        }
        .bottom{
          display: block;
        }
        .last{
          display: none;
        }
      }
    }
    .footer-bottom{
      .box{
        width:100%;
      }
    }
  }
}
</style>