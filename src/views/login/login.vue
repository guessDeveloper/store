<template>
  <div class="login">
     <navBar></navBar>
     <div class="content" :style="'background:url('+config.LoginBackgroundImage+') no-repeat center center;'">
        <div class="middle">
           <div class="login-box" >
              <div class="tab-box">
                 <span  :class="{active:type==1}" @click="tabchange(1)">用户登录</span><span :class="{active:type==2}" @click="tabchange(2)">商家登录</span>
              </div>
              <div class="input-box">
                 <span class="iconfont iconzh"></span><input type="text" placeholder="用户名称/手机号码" v-model.trim="userName" @blur="isLoginCode">
              </div>
              <div class="input-box">
                <span class="iconfont iconmima"></span><input type="password" placeholder="密码" v-model.trim="password">
              </div>
              <div class="input-box" v-if="needCode == 'true'">
                 <span class="iconfont icondxyzm" ></span><input type="text" placeholder="输入短信验证码" v-model.trim="msgCode" maxlength="6"><button class="msg-btn" @click="getMsgCode">{{codeBtn}}</button>
              </div>
              <button class="btn login-btn" @click="login">登录</button>
              <div class="other">
                <a  class="forget-btn" @click="reset">忘记密码？</a>
                <a class="regeter-btn" @click="register" v-show="type == 1">新用户注册</a>
                <a class="regeter-btn" @click="register" v-show="type == 2">新商家注册</a>
              </div>
           </div>
        </div>
     </div>
     <footerBar :isLogin="true"></footerBar>
  </div>
</template>
<script>
import { mapState} from 'vuex' //注册 action 和 state
import navBar from '@/components/login/login-nav'
import footerBar from '@/components/common/footer'
export default {
  data(){
    return{
      type:'1',
      userName:'',
      password:'',
      needCode:false,
      msgCode:'',
      lock:false,
      count:60,
      timer:'',
      codeBtn:'获取验证码'
    }
  },
  components:{
    footerBar:footerBar,
    navBar:navBar
  },
  computed:{
    ...mapState([
      'config'
    ])
  },
  methods:{
    tabchange(type){
        this.type = type
        this.userName = ''
        this.password = ''
        this.needCode = false
    },
    login(){
      if(this.checkLogin()){
        if(this.type==1){
           this.userLogin()
        }else{
           this.storeLogin() 
        }
      }
    },
    //查询是否需要验证码
    isLoginCode(){
      if(this.userName !== ''){
        if(this.type == '1'){
          this.$http.post(this.$api.UserLoginIsNeedVerify,{UserName:this.userName}).then(res=>{
            if(res.data.Code == 1){
               this.needCode = res.data.Data
            }
          })
        }else{
          this.$http.post(this.$api.MerchantLoginIsNeedVerify,{Account:this.userName}).then(res=>{
            if(res.data.Code == 1){
               this.needCode = res.data.Data
            }
          })
        } 
      }
    },
    //忘记密码
    reset(){
      if(this.type == 1){
        this.$router.push('/reset')
      }else{
        this.$router.push('/reset?type=2')
      }
    },
    checkLogin(){
      if(this.userName == ''){
        this.$message.error('请输入用户名称/手机号码')
        return false
      }else if(this.password == ''){
        this.$message.error('请输入密码')
      }else if(this.needCode == 'true'&&this.msgCode == ''){
        this.$message.error('请输入短信验证码')
        return false
      }else{
        return true
      }
    },
    //获取短信验证码
    getMsgCode(){
      if(this.lock == true)return false
      this.lock = true
      if(this.type == 1){
        this.$http.post(this.$api.UserLoginSendVerifyCode,{UserName:this.userName}).then(res=>{
          if(res.data.Code == 1){
            this.setCode()
          }else{
            this.lock = false;
            this.$message.error(res.data.Msg)
          }
        }).catch(res=>{
          this.lock = false
          this.$message.error(res.data.Msg)
        })
      }else{
        this.$http.post(this.$api.MerchanterSendVerifyCode,{MName:this.userName}).then(res=>{
          if(res.data.Code == 1){
            this.setCode()
          }else{
            this.lock = false;
            this.$message.error(res.data.Msg)
          }
        }).catch(res=>{
          this.lock = false;
          this.$message.error(res.data.Msg)
        })
      }
    },
     //验证码倒计时
    setCode(){
       this.count--
       this.codeBtn = `${this.count}s`
       clearInterval(this.timer)
       this.timer = setInterval(()=>{
         if(this.count == 1){
           clearInterval(this.timer);
           this.lock = false;
           this.codeBtn = '获取验证码';
           this.count = 60;
         }else{
           this.count -- ;
           this.codeBtn = `${this.count}s`
         }
       },1000) 
    },
    //用户登录
    userLogin(){
      this.$http.post(this.$api.Login,{
        UserName:this.userName,
        UserPassword:this.password,
        VerifyCode:this.msgCode

      }).then(res=>{
        if(res.data.Code == 1){
          localStorage.setItem('token',res.data.Data)
          this.$router.push('/persion')
        }else{
          this.isLoginCode();
          this.$message.error(res.data.Msg)
        }
      })
    },
    //商家注册
    storeLogin(){
      this.$http.post(this.$api.storeLogin,{
        Account:this.userName,
        passwd:this.password,
        VerifyCode:this.msgCode

      }).then(res=>{
        if(res.data.Code == 1){
          localStorage.setItem('storeToken',res.data.Data)
          this.$router.push('/store')
        }else{
           this.isLoginCode();
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
  background-size:auto 100%!important;
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
  .icondxyzm{
    font-size:14px;
    top:16px;
  }
  .msg-btn{
    position:absolute;
    top:14px;
    right:20px;
    font-size:14px;
    color:@main;
    height:22px;
    text-align:right;
    
  }
  input{
    display: block;
    box-sizing: border-box;
    width:100%;
    height:100%;
    padding-left:60px;
    font-size:14px;
    border:1px solid @class_border;
     -webkit-appearance: none;
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