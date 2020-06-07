<template>
  <div class="login-nav">
    <div class="box">
      <a class="logo">
        <img src="../../assets/img/logo.png" alt="">
      </a>
      <span class="type" v-if="type == 'login'">
         登录
      </span>
      <span class="type" v-if="type == 'register'">
         {{store}}注册
      </span>
      <span class="type" v-if="type == 'reset'">
         重置密码
      </span>
      <router-link class="home" tag="a" to="/" v-if="type!=='register'&&type!=='reset'">进入网站首页</router-link>
      <router-link class="home" tag="a" to="/login" v-if="type=='register'">已有账号，<span>立即登录</span></router-link>
       <router-link class="home" tag="a" to="/login" v-if="type=='reset'">登录</router-link>
    </div>
  </div>
</template>
<script>
export default {
  data(){
    return{
      store:''
    }
  },
  mounted(){
    if(this.$route.query.isStore == '1'){
      this.store = '商家'
    }
  },
  props:{
    type:{
      type:String,
      default:'login'
    }
  }
}
</script>
<style lang="less" scoped>
.login-nav{
  height:100px;
  background:#fff;
   .box{
     width:@max-width;
     margin:0 auto;
     background:#fff;
     height:100%;
     .logo{
       float: left;
       margin-top:27px;
       img{
         display: block;
         width:147px;
         height:auto;
       }
     }
     .type{
       float: left;
       height:32px;
       line-height: 32px;
       padding-left:15px;
       margin-left:15px;
       margin-top:34px;
       font-size:24px;
       color:@placeholder_color;
       border-left:2px solid @class_border;
     }
     .home{
       float: right;
       font-size:16px;
      line-height: 22px;
      margin-top:39px;
      color:@font_color;
      span{
        color:@main;
      }
     }
   }
}
@media screen and(max-width:@change_width){
  .login-nav{
    height:58/@p;
    .box{
      width:100%;
      box-sizing: border-box;
      padding:0 15px;
      .logo{
        height:25/@p;
        margin-top:17px;
        img{
          width:94/@p;
          height:100%;
        }
      }
      .type{
        height: 24/@p;
        line-height: 24/@p;
        font-size:18/@p ;
        margin-top:17/@p;
        padding-left:15/@p;
        margin-left: 14/@p;
      }
      .home{
        font-size:12/@p;
        line-height: 17/@p;
        margin-top:21/@p;
      }
    }
    
  }
}
</style>