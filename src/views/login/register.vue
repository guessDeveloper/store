<template>
  <div class="register-box">
     <navBar type="register"></navBar>
     <div class="register">
       <div class="input-box">
         <input type="text" placeholder="请输入手机号码">
       </div>
       <div class="input-box code">
         <input type="text" placeholder="请输入短信验证码"><span class="getCode">获取验证码</span>
       </div>
        <div class="input-box">
         <input type="password" placeholder="请输入6至20位登录密码">
       </div>
        <div class="input-box">
         <input type="password" placeholder="请再次输入登录密码">
       </div>
        <div class="input-box">
         <input type="text" placeholder="请输入邀请人">
       </div>
       <div class="agreement">已阅读并同意<router-link tag="a" to="/agreement">《用户服务协议》</router-link></div>
       <button class="btn">立即注册</button>
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
        count:60
    }
  },
  components:{
    footerBar:footerBar,
    navBar:navBar
  },
  methods:{
    
  }
}
</script>
<style lang="less" scoped>
@import '../../assets/less/common.less';
.register{
  width:@max-width;
  padding-top:70px;
  height:560px;
  margin:30px auto;
  background:#fff;
}
.input-box{
  width:380px;
  height:50px;
  margin:0 auto 20px;
  &.code{
    position: relative;
    input{
      padding-right:100px;
    }
    .getCode{
      position: absolute;
      top:14px;
      right:20px;
      width:80px;
      font-size:14px;
      line-height: 22px;
      color:@main;
      cursor: pointer;
    }
  }
  input{
    display: block;
    box-sizing: border-box;
    width:100%;
    height:100%;
    padding-left:15px;
    font-size:14px;
    border:1px solid @class_border;
  }
}
.agreement{
  width:380px;
  margin:30px auto 0;
  text-align: left;
  font-size:14px;
  color:#666666;
  a{
    color:@main;
  }
}
.btn{
  display: block;
  width: 380px;
  height:50px;
  margin:30px auto 0;
  border:0;
  background: @main;
  color:#fff;
  font-size:16px;
}
</style>