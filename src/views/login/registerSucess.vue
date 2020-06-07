<template>
  <div class="box">
    <navBar type="register"></navBar>
      <div class="item-box">
        <div class="item"> 
          <span class="iconfont iconqrwc icon-complate"></span>
              <div class="step-name">恭喜注册成功</div>
              <div class="step-tip">请妥善保管您的账户信息</div>
          <router-link class="btn submit" style="margin-top:50px;" tag="button" to="/login">登录</router-link>
        </div>
      </div>
     <footerBar :isLogin="true"></footerBar>
  </div>
</template>
<script>
import navBar from '@/components/login/login-nav'
import footerBar from '@/components/common/footer'
export default {
  data(){
    return{

    }
  },
  components:{
    footerBar:footerBar,
    navBar:navBar,
  }
}
</script>
<style lang="less" scoped>
.item-box{
  width:@max-width;
  height:630px;
  margin:30px auto;
  background:#fff;
  .item{
    width:380px;
    text-align:center;
    margin:0 auto;
  }
  @media screen and(max-width:@change_width){
    width:auto;
    margin:15/@p;
    box-sizing: border-box;
    padding:0 15/@p;
    .item{
      width:auto;
    }
  }
}
.icon-complate{
    display: block;
    width:100px;
    height:100px;
    margin:0 auto;
    padding-top:150px;
    font-size:100px;
    line-height: 100px;
    color:@main;
}
.step-name{
    font-size:18px;
    color:@main;
    line-height: 18px;
    margin-top:25px;
}
.step-tip{
    font-size:14px;
    color:@subtitle_color;
    line-height: 14px;
    margin-top:15px;
}
.submit{
    margin-top:10px;
    width:100%;
    height:50px;
    font-size:16px;
    color:#FFF;
    background:@main;
    border:0;
}
</style>