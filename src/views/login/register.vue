<template>
  <div class="register-box">
     <navBar type="register"></navBar>
     <div class="register">
        <div class="tab-box">
                 <span  :class="{active:isStore==0}" @click="tabchange(0)">消费者</span><span :class="{active:isStore==1}" @click="tabchange(1)">商家</span>
      </div>
       <div class="input-box">
         <input type="text" placeholder="请输入手机号码" v-model.trim="phone">
       </div>
       <div class="input-box code">
         <input type="text" placeholder="请输入短信验证码" v-model.trim="Code" maxlength="6"><span class="getCode" @click="getCode">{{codeBtn}}</span>
       </div>
        <div class="input-box">
         <input type="password" placeholder="请输入新密码" v-model.trim="password" maxlength="20">
       </div>
       <div class="input-tip">
         	请输入最小为8位至少包含1个大写字母，1个小写字母和1个数字的密码,可使用标点符号并且不能连续输入相同大小写字母数字3次或3次以上
       </div>
        <div class="input-box">
         <input type="password" placeholder="请再次输入登录密码" v-model.trim="repetPass" maxlength="20">
       </div>
       <div class="input-box" v-if="isStore == 1">
         <input type="text" placeholder="请输入商家名称" v-model.trim="storeName">
       </div>
        <div class="input-box">
         <input type="text" placeholder="请输入邀请人" v-model.trim="promote" :readonly="promoteReady" :class="{readonly:promoteReady}">
       </div>
       <div class="agreement"><el-checkbox v-model="checked" class="check-box"></el-checkbox>已阅读并同意<a  @click="agreement" v-show="isStore == 0">《消费者服务协议》</a><a  @click="agreement" v-show="isStore == 1">《商家注册协议》</a></div>
       <button class="btn" @click="register">立即注册</button>
     </div>
     <footerBar :isLogin="true"></footerBar>
  </div>
</template>
<script>
import '../../plugins/element-checkbox.js'
import navBar from '@/components/login/login-nav'
import footerBar from '@/components/common/footer'
export default {
  data(){
    return{
        count:60,
        phone:'',
        Code:'',
        password:'',
        repetPass:'',
        lock:false,
        codeBtn:'获取验证码',
        timer:'',
        promote:'',
        storeName:'',
        isStore:0, //0 用户注册 1 商家注册
        checked:false,
        promoteReady:false
    }
  },
  components:{
    footerBar:footerBar,
    navBar:navBar,
    
  },
  mounted(){
    this.$route.query.isStore == 1?this.isStore = 1:''
    this.$route.query.invitecode?this.promote = this.$route.query.invitecode:''
    this.$route.query.invitecode?this.promoteReady = true:''
  },
  methods:{
    tabchange(num){
      this.isStore = num
    },
    //获取验证码
    getCode(){
      if(this.lock)return false;
      if(this.$util.testPhone.test(this.phone)){
        if(this.isStore == 1){
          this.storeCode();
        }else{
          this.userCode();
        }
      }else{
        this.$message.error('请输入正确的手机号');
      }
    },
    //用户注册获取验证码
    userCode(){
      this.$http.post(this.$api.SendRegistCode,{UserPhoneNO:this.phone}).then(res=>{
          if(res.data.Code == 1){
            console.log('发送成功')
            this.lock = true;
            this.setCode();
          }else{
            this.$message.error(res.data.Msg)
          }
      })
    },
    //商家注册获取验证码
    storeCode(){
       this.$http.post(this.$api.M_SendRegistCode,{phone:this.phone}).then(res=>{
          console.log(res.data)
          if(res.data.Code == 1){
            console.log('发送成功')
            this.lock = true;
            this.setCode();
          }else{
            this.$message.error(res.data.Msg)
          }
      })
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
    //注册校验
    register(){
      console.log(this.checked)
      if(!this.$util.testPhone.test(this.phone)){
         this.$message.error('请输入正确的手机号');
         return false
      }else if(this.Code == ''){
        this.$message.error('请输入验证码');
        return false
      }else if(this.password.length<6||this.password.length>20){
        this.$message.error('请输入6至20位登录密码');
        return false
      }else if(this.password!=this.repetPass){
         this.$message.error('两次输入密码不一致');
        return false
      }else if(this.isStore == 1&& this.storeName == ''){
        this.$message.error('请输入商家名称');
        return false

      }else if(this.promote == ''){
        this.$message.error('请输入邀请人');
        return false
      }else if(this.checked == false){
        this.$message.error('请勾选同意用户协议');
        return false
      }else{
        this.isStore == 1? this.storeRegister():this.userRegister();
      }
    },
    //用户注册
    userRegister(){
      this.$http.post(this.$api.AddUser,{UserPhoneNO:this.phone,ValidCode:this.Code,User_PWD:this.password,UserInviter:this.promote?this.promote:'NOInviter'}).then(res=>{
          if(res.data.Code == 1){
             this.$router.push('/registerSucess')
          }else{
            this.$message.error(res.data.Msg);
          }
      })
    },
    //商家注册
    storeRegister(){
      this.$http.post(this.$api.ADDMerchanter,{phone:this.phone,verificationCode:this.Code,PWD:this.password,inviter:this.promote?this.promote:'NOInviter',Name:this.storeName}).then(res=>{
          if(res.data.Code == 1){
             this.$router.push('/registerSucess?isStore==1')
          }else{
            this.$message.error(res.data.Msg);
          }
      })
    },
    agreement(){
      let routeData;
      if(this.isStore == 1){
        routeData = this.$router.resolve({ path:'/agreement',query:{isStore:1} });
      }else{
        routeData = this.$router.resolve({ path:'/agreement'});
      }
      window.open(routeData.href, '_blank');
    }
  }
}
</script>
<style lang="less" scoped>
.register{
  width:@max-width;
  padding-top:70px;
  // height:560px;
  margin:30px auto;
  background:#fff;
  padding-bottom:106px;
  @media screen and(max-width:@change_width){
    width:auto;
    margin:15px 15px 30px;
    padding-top:20px;
    height: auto;
    padding-bottom:50px;
  }
}
  .tab-box{
        position: relative;
        width:380px;
        text-align: center;
        margin:0 auto;
        height:30px;
        line-height: 30px;
        font-size:24px;
        color:@subtitle_color;
        padding:0px 0 50px;
        &::before{
          content:'';
          position: absolute;
          top:0px;
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
    @media screen and(max-width:@change_width){
      width:100%;
      padding-bottom:20px;
      &::before{
        left:50%;
      }
    }
}
.input-tip{
  width:380px;
  margin:-10px auto 20px;
  color:@password_tip_color;
   @media screen and(max-width:@change_width){
    width:auto;
    margin:-5px 15px 20px;
  }
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
      text-align: right;
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
    &.readonly{
        background:@readOnly;   
    }
  }
  @media screen and(max-width:@change_width){
    width:auto;
    margin:0 15px 20px;
  }
}
.agreement{
  width:380px;
  margin:30px auto 0;
  text-align: left;
  font-size:14px;
  color:#666666;
  .check-box{
    margin-right:6px;
  }
  a{
    color:@main;
  }
  @media screen and(max-width:@change_width){
    margin:30px 15px 0;
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
  &:active{
    background:@btnActiveColor;
  }
  @media screen and(max-width:@change_width){
    width:calc(100% - 30px);
    margin:30px 15px 0;
  }
}
</style>