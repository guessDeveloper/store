<template>
  <div class="login">
     <navBar></navBar>
     <div class="content">
        <div class="middle">
           <div class="login-box">
              <div class="tab-box">
                 <span  :class="{active:type==1}" @click="type=1">用户登录</span><span :class="{active:type==2}" @click="type=2">商家登录</span>
              </div>
              <div class="input-box">
                 <span class="iconfont iconzh"></span><input type="text" placeholder="用户名称/手机号码" v-model.trim="userName">
              </div>
              <div class="input-box">
                <span class="iconfont iconmima"></span><input type="password" placeholder="密码" v-model.trim="password">
              </div>
              <button class="btn login-btn" @click="login">登录</button>
              <div class="other">
                <router-link tag="a" class="forget-btn" to="/reset">忘记密码？</router-link>
                <a class="regeter-btn" @click="register">新用户注册</a>
              </div>
           </div>
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
      type:'1',
      userName:'',
      password:''
    }
  },
  components:{
    footerBar:footerBar,
    navBar:navBar
  },
  methods:{
    login(){
      if(this.checkLogin()){
        if(this.type==1){
           this.userLogin()
        }else{
           this.storeLogin() 
        }
      }
    },
    checkLogin(){
      if(this.userName == ''){
        this.$message.error('请输入用户名称/手机号码')
        return false
      }else if(this.password == ''){
        this.$message.error('请输入密码')
      }else{
        return true
      }
    },
    //用户登录
    userLogin(){
      this.$http.post(this.$api.Login,{
        UserName:this.userName,
        UserPassword:this.password,
        VerifyCode:''

      }).then(res=>{
        if(res.data.Code == 1){
          this.$router.push('/')
        }else{
          this.$message.error(res.data.Msg)
        }
      })
    },
    storeLogin(){
      this.$http.post(this.$api.Login,{
        Account:this.userName,
        passwd:this.password,
        VerifyCode:''

      }).then(res=>{
        if(res.data.Code == 1){
          this.$router.push('/')
        }else{
          this.$message.error(res.data.Msg)
        }
      })
    },
    register(){
      this.type == 1?this.$router.push('/register'):this.$router.push('/register?isStore=1')
    }
  }
}
</script>
<style lang="less" scoped>

.content{
  width:100%;
  min-width: @max-width;
  height:680px;
  text-align: center;
  background:url(../../assets/img/logon-bc.png) no-repeat center center;
  background-size:auto 100%;
  .middle{
    width:@max-width;
    margin:0 auto;
    .clear();
    .login-box{
      box-sizing: border-box;
      float: right;
      width:500px;
      height:560px;
      margin-top:60px;
      padding:0 60px;
      background:#fff;
      .tab-box{
        position: relative;
        height:30px;
        line-height: 30px;
        font-size:24px;
        color:@subtitle_color;
        padding:67px 0 50px;
        &::before{
          content:'';
          position: absolute;
          top:67px;
          left:190px;
          display: block;
          width:1px;
          height:30px;
          background:#F1F2FB;
        }
        span{
          display: inline-block;
          width:50%;
          cursor: pointer;
          &.active{
            color:@main;
          }
        }
      }

    }
  }
  @media screen and(max-width:@change_width){
    background: none;
    min-width: 100%;
    height: auto;
    .middle{
      width:100%;
      .login-box{
        width:auto;
        float: none;
        margin:15px;
        padding:0 15px;
        .tab-box{
          height:28px;
          line-height: 28px;
          font-size:18px;
          padding:30px 0 48px;
          &::before{
          content:'';
          position: absolute;
          top:26px;
          left:50%;
          display: block;
          width:1px;
          height:30px;
          background:#F1F2FB;
        }
        }
      }
    }
  }
}
.input-box{
  position: relative;
  height:50px;
  margin-bottom:20px;
  .iconfont{
    position: absolute;
    left:22px;
    top:10px;
    font-size:20px;
    color:@placeholder_color;
  }
  input{
    display: block;
    box-sizing: border-box;
    width:100%;
    height:100%;
    padding-left:60px;
    font-size:14px;
    border:1px solid @class_border;
  }
}
.login-btn{
  display: block;
  width: 100%;
  height:50px;
  margin-top:40px;
  border:0;
  background: @main;
  color:#fff;
  font-size:16px;

}
.other{
  .clear();
  margin-top:20px;
  line-height: 14px;
  .forget-btn{
    float: left;
    font-size:14px;
    color:#464855;
  }
  .regeter-btn{
    float: right;
    font-size:14px;
    color:@main;
  }
}

</style>