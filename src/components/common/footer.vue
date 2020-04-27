<template>
  <div class="footer">
    <div class="footer-top">
       <div class="link-box">  
         <a href="">关于我们</a>
         <span>|</span>
         <a href="">帮助中心</a>
         <span>|</span>
         <a href="">售后服务</a>
         <span>|</span>
         <a href="">配送与验收</a>
         <span>|</span>
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
    <div class="footer-bottom"><div class="box"><a >CopyRight © 消费乐2015</a></div></div>
  </div>
</template>
<script>
export default {
  
}
</script>
<style lang="less" scoped>
@import '../../assets/less/common.less';
.footer{
  width:100%;
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
    .footer-top{
      .link-box{
        width:100%;
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