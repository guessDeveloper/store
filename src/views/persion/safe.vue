<template>
  <div class="safe-box">
    <div class="persion-title">安全设置</div>
    <div class="safe-content" v-show="!isChangingPhone">
       <div class="user">您的当前昵称:<span>{{userInfo.nickName}}</span></div>
       <div class="item">
         <span class="iconfont iconxgmm"></span>
         <div class="des">
           <div class="name">登录密码</div>
           <div class="con">建议您定期更换密码，设置安全性高的密码可以使账户更安全</div>
         </div>
         <button class="btn" @click="changePas = true">修改</button>
       </div>
       <div class="item">
         <span class="iconfont iconbdsj"></span>
         <div class="des">
           <div class="name">手机号: {{phoneLimit(userInfo.UserTel)}}</div>
           <div class="con">安全手机可以用于登录账户，重置密码或其他安全验证</div>
         </div>
         <button class="btn" @click="isChangingPhone = true">修改</button>
       </div>

    </div>
    <el-dialog title="修改密码" :visible.sync="changePas" width="520px" class="small">
      <div class="change-box">
       <div class="phone">已绑定的手机：{{phoneLimit(userInfo.UserTel)}}</div>
       <div class="tip"></div>
        <div class="input-line">
           <label for="">短信验证码：</label><div class="input-box"><input type="text" placeholder="输入短信验证码" v-model.trim="changeCode"><button class="btn" @click="getCode">{{codeBtn}}</button></div>
        </div>
        <div class="input-line">
            <label for="">输入原密码：</label><div class="input-box"><input type="password" placeholder="请输入原密码" max-length="20" v-model.trim="oldPas"></div>
        </div>
        <div class="input-line">
            <label for="">输入新密码：</label><div class="input-box"><input type="password" placeholder="设置6至20位登录密码" max-length="20" v-model.trim="newPas"></div>
        </div>
        <div class="input-line">
            <label for="">再次输入：</label><div class="input-box"><input type="password" placeholder="请再次输入登录密码" max-length="20" v-model.trim="reNewpas"></div>
        </div>
        <div class="btn-box">
          <button class="ok" @click="changePaswrod">确认</button>
          <button class="no" @click="changePas=fale">取消</button>

        </div>
       </div>
    </el-dialog>
     <!-- 修改手机号 -->
    <div class="change-phone-box" v-show="isChangingPhone">
        <div class="title">
          更换手机号码
        </div>
        <div class="step step-one" v-show="step != 3">
            <div class="step-item" :class="{active:step >= 1}">
                <span class="step-num">1</span>
                <div class="step-name">验证身份</div>
            </div>
            <div class="step-item middle" :class="{active:step >= 2}">
                <span class="step-num">2</span>
                <div class="step-name">修改手机号码</div>
            </div>
            <div class="step-item" :class="{active:step >= 3}">
                <span class="step-num">3</span>
                <div class="step-name">完成更换</div>
            </div>
        </div>
        <div class="stepOne" v-show="step == 1">
            <div class="now-phone">已绑定的手机：{{phoneLimit(userInfo.UserTel)}}</div>
            <div class="tip"></div>
            <div class="big-box">
              <div class="input-line-box">
                <div class="input-box">
                    <label for="">短信验证码：</label><input type="text" placeholder="输入短信验证码" maxlength="8" v-model.trim="oldPhoneCode"><button class="code" @click="changePhoneCode">{{codeBtn}}</button>
                </div>

              </div>
              <button class="btn" @click="goStepTwo">下一步</button>
            </div>
        </div>
        <div class="stepTwo" v-show="step == 2">
           <div class="big-box">
              <div class="input-line-box mobile-box">
                 <div class="input-box">
                    <label for="">新手机号码：</label><input type="text" placeholder="输入新的手机号码" maxlength="11" v-model.trim="newPhone">
                </div>
              </div>
              <div class="input-line-box">
                <div class="input-box">
                    <label for="">短信验证码：</label><input type="text" placeholder="输入短信验证码" maxlength="8" v-model.trim="newPhoneCode"><button class="code" @click="getNewPhoneCode" >{{newCodeBtn}}</button>
                </div>

              </div>
              <button class="btn" @click="goStepThree">下一步</button>
            </div>
        </div>
        <div class="stepThree" v-show="step == 3">
            <div class="iconfont iconqrwc"></div>
            <div class="new">手机号码更换成功</div>
            <div class="tip">您可以在下次使用新号码进行登录</div>
            <button class="btn" @click="stepBack"> 返回</button>
        </div>
    </div>
    <!-- 修改手机号 -->
    <div class="safe-tip">
         <h4>安全服务提示</h4>
         <ul>
           <li>· 确认您登录的是优乐兑网址，注意防范进入钓鱼网站，不要轻信各种即时通讯工具发送的商品或支付链接，谨防网购诈骗</li>
           <li>· 建议您安装杀毒软件，并定期更新操作系统等软件补丁，确保账户及交易安全</li>
         </ul>
       </div>
  </div>
</template>
<script>
import '../../plugins/element-table.js'
import { mapState, mapMutations} from 'vuex' //注册 action 和 state
export default {
  data(){
    return{
       changePas:false,
       userPhone:'',
       userInfo:{},
       count:60,
       codeBtn:'获取验证码',
       lock:false,
       changeCode:'',
       oldPas:'',
       newPas:'',
       reNewpas:'',
       step:1,
       isChangingPhone:false,
       oldPhoneCode:'',
       newPhone:'',
       newPhoneCode:'',
       newCodeBtn:'获取验证码',
       newBtnlock:false,
       newTimer:'',
       newCount:60,
    }
  },
  computed:{
    ...mapState(['userInfo'])
  },
  mounted(){
    let userInfo = sessionStorage.getItem('userInfo')?JSON.parse(sessionStorage.getItem('userInfo')):{};
    this.userPhone = userInfo.UserTel;
    this.userInfo = userInfo
  },
  methods:{
    ...mapMutations([
      'setUserInfo'
    ]),
       //获取用户登录信息
     getUserInfo(){
       this.$http.limitGet(this.$api.GetUserInfo).then(res=>{
         if(res.data.Code == 1){
           this.setUserInfo(res.data.Data)
           let userInfo = JSON.stringify(res.data.Data);
           sessionStorage.setItem('userInfo',userInfo)
         }
       })
     },
    //获取验证码
    getCode(){
      if(this.lock)return false
      this.lock = true;
      this.$http.limitGet(this.$api.UserEditPWDSendVerifyCode).then(res=>{
        if(res.data.Code == 1){
          this.setCode()
        }else{
          this.lock = false
          this.$message.error(res.data.Msg)
        }
      })
    },
    //手机好脱敏
    phoneLimit(phone){
       return this.$util.phoneLimit(phone)
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
    setNewCode(){
       this.newCount--
       this.newCodeBtn = `${this.newCount}s`
       clearInterval(this.newTimer)
       this.newTimer = setInterval(()=>{
         if(this.newCount == 1){
           clearInterval(this.newTimer);
           this.newBtnlock = false;
           this.newCodeBtn = '获取验证码';
           this.newCount = 60;
         }else{
           this.newCount -- ;
           this.newCodeBtn = `${this.newCount}s`
         }
       },1000)
    },
    changePaswrod(){
       if(this.changeCode == ''){
         this.$message.error('请输入验证码')
         return false
       }else if(this.oldPas == ''){
         this.$message.error('请输入原密码')
         return false
       }else if(this.newPas.length<6){
          this.$message.error('请输入6至20位登录密码')
         return false
       }else if(this.newPas !== this.reNewpas){
         this.$message.error('两次输入密码不一致')
         return false
       }else if(this.oldPas == this.newPas){
         this.$message.error('新密码不能与原密码一致')
       }else{
         this.resetPa();
       }
    },
    //重置密码
    resetPa(){
      this.$http.limitPost(this.$api.EditUserInfo_PWD,{VerifyCode:this.changeCode,OldPwd:this.oldPas,NewPwd:this.newPas}).then(res=>{
         if(res.data.Code == 1){
           this.$message.success('修改成功')
           this.clearReset();
         }else{
           this.$message.error(res.data.Msg)
         }
      })
    },
    //清除修改输入
    clearReset(){
      this.changeCode = ''
      this.reNewpas = ''
      this.newPas = ''
      this.oldPas = ''
      this.changePas = false
    },
    //修改手机号获取验证码
    changePhoneCode(){
      if(this.lock)return false
      this.lock = true;
      this.$http.limitGet(this.$api.UserEditPhoneNOSendVerifyCode).then(res=>{
        if(res.data.Code == 1){
          this.setCode()
        }else{
          this.lock = false;
          this.$message.error(res.data.Msg)
        }
      })
    },
    goStepTwo(){
      if(this.oldPhoneCode == ''){
        this.$message.error('请输入验证码')
        return false
      }else{
        this.$http.limitPost(this.$api.UserEditPhoneNOVerify,{VerifyCode:this.oldPhoneCode}).then(res=>{
          if(res.data.Code == 1){
            this.step = 2
          }else{
            this.$message.error(res.data.Msg)
          }
        })
      }
    },
    //获取新手机号验证码
    getNewPhoneCode(){
      if(!this.$util.testPhone.test(this.newPhone)){
        this.$message.error('请输入正确的手机号')
      }else{
        if(this.newBtnlock)return false
        this.newBtnlock = true;
        this.$http.limitPost(this.$api.UserEditPhoneNOSendVerifyCodeAgain,{
          PhoneNO:this.newPhone
        }).then(res=>{
          if(res.data.Code == 1){
             this.setNewCode();
          }else{
            this.$message.error(res.data.Msg)
          }
          this.newBtnlock = false
        })
      }
    },
    goStepThree(){
      if(!this.$util.testPhone.test(this.newPhone)){
        this.$message.error('请输入正确的手机号')
      }else if(this.newPhoneCode == ''){
        this.$message.error('请输入验证码')
      }else{
        this.$http.limitPost(this.$api.UserEditPhoneNOVerifyAgain,{
          PhoneNo:this.newPhone,
          VerifyCode:this.newPhoneCode
        }).then(res=>{
          if(res.data.Code == 1){
            this.userInfo.UserTel = this.newPhone
            this.getUserInfo();
            this.step = 3
          }else{
            this.$message.error(res.data.Msg)
          }
        })
      }
    },
    stepBack(){
      this.isChangingPhone = false
      this.step = 1;
    }
  }
}
</script>
<style lang="less" scoped>
@icon_color:#CFD0DF;
.safe-box{
  min-height: @persion_height;
  padding-bottom:60px;
}
@media screen and(max-width:@change_width){
  .safe-box {
    padding-bottom: 120px;
  }
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
      background:none;
    }
  }
  @media screen and(max-width:@change_width){
    padding:0 15px;
    .user{
      padding-top:20px;
      border:0;
    }
    .item{
      height:auto;
      line-height:1;
      padding-bottom:30px;
      margin-bottom:30px;
      .iconfont{
        margin-left:0;
        height:48px;
        line-height: 48px;
      }
      .des{
        width:calc(100% - 60px);
        margin-left:8px;
      }
      .btn{
        float: none;
        width:100%;
        margin-top:20px;
      }
    }
  }
}
.safe-tip{
  box-sizing: border-box;
  height:100px;
  margin-top:30px;
  margin:30px 30px 0;
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
  @media screen and(max-width:@change_width){
    height:auto;
    padding:20px 15px;
    ul{
      li{
        line-height: 24px;
      }
    }
  }
}
//修改密码
.change-box{
  .phone{
    font-size:18px;
    color:@main;
    line-height: 18px;
    margin-top:20px;
    font-weight: bold;
  }
  .tip{
    font-size:14px;
    color:@subtitle_color;
    line-height: 14px;
    margin-top:15px;
    margin-bottom:20px;
  }
  .input-line{
    position: relative;
    height:34px;
    margin:10px 0;
    .btn{
      position: absolute;
      top:1px;
      right:1px;
      width:87px;
      height:32px;
      padding:0 12px;
      font-size:12px;
      color:@main;
      border:0;
      text-align: right;
      background:#fff;
    }
    label{
      float: left;
      width:16.67%;
      box-sizing: border-box;
      padding-right:6px;
      text-align:right;
      font-size: 12px;
      line-height:34px;
      height:34px;
      color:#666;
    }
    .input-box{
      float:left;
      box-sizing: border-box;
      width:83.33%;
      height:34px;
      border:1px solid @class_border;
      input{
        display: block;
        width:100%;
        height:100%;
        box-sizing: border-box;
        padding-left:12px;
        border:0;
        font-size:12px;
      }
    }
  }
  .btn-box{
    .clear();
    margin-top:40px;
    button{
      float: right;
      width:65px;
      height:30px;
      font-size:14px;
      margin-left:15px;
      background:#fff;
      border:1px solid @class_border;
      border-radius: 4px;
    }
    .ok{
      color:#fff;
      background:@main;
      border-color:@main;
    }
  }
  @media screen and(max-width:@change_width){
     .input-line{
       label{
         width:28.5%;
       }
       .input-box{
         width:71.5%;
       }
     }
  }
}
 @media screen and(max-width:@change_width){
   .small{
     .el-dialog{
       width:325px!important;
     }
   }
 }
 //修改手机号
 .change-phone-box{
   text-align: center;
   padding:0 30px;
   .title{
     text-align: left;
     font-size:14px;
     padding-top:10px;
     line-height:54px ;
     border-bottom:1px solid @class_border;
   }
   .stepOne{
     overflow: hidden;
     padding-bottom:100px;
     border-bottom:1px solid @class_border;
     .now-phone{
       font-size:18px;
       color:@main;
       line-height: 18px;
       margin-top:60px;
       font-weight: bold;
     }
     .tip{
       font-size:14px;
       line-height: 14px;
       margin-top:15px;
       margin-bottom:40px;
       color:@subtitle_color;
     }
   }
   @media screen and(max-width:@change_width){
     padding:0 15px;
     .stepOne {
       padding-bottom: 30px;
       .tip {
          margin-bottom: 60px;
        }
        .now-phone {
          margin-top: 40px;
        }
     }
    }
   .stepTwo{
      padding-top:77px;
      border-bottom:1px solid @class_border;
      padding-bottom:100px;
   }
   @media screen and(max-width:@change_width){
     .stepTwo {
       padding-top: 55px;
       padding-bottom: 30px;
       .tip {
          margin-bottom: 60px;
        }
     }
    }
   .stepThree{
     padding-bottom:100px;
     .iconfont{
       font-size:100px;
       color:@main;
       height:100px;
       line-height: 100px;
       margin-top:110px;
     }
     .new{
       font-size:18px;
       color:@main;
       line-height: 18px;
       font-weight: bold;
       margin-bottom: 15px;
       margin-top:25px;
     }
     .tip{
       font-size:14px;
       color:@subtitle_color;
       line-height: 14px;
       margin-bottom:50px;
     }

   }
    @media screen and(max-width:@change_width){
      .stepThree {
        padding-bottom: 60px;
        .iconfont{
          margin-top: 60px;
        }
        .tip {
          margin-bottom: 40px;
        }
      }
    }
   .btn{
    width:380px;
    height:50px;
    font-size:14px;
    color:#fff;
    background:@main;
  }
  .input-line-box{
    position: relative;
    width:380px;
    height:50px;
    margin:0 auto;
    margin-bottom:20px;
    label{
      position: absolute;
      right:100%;
      top:0;
      width:90px;
      height:50px;
      line-height: 50px;
      color:#464855;
    }
    .code{
      position: absolute;
      top:0;
      width:100px;
      height:50px;
      font-size:14px;
      text-align: right;
      padding-right:20px;
      right:0;
      color:@main;
    }
    input{
        display: block;
        box-sizing: border-box;
        width:100%;
        height:50px;
        border:1px solid @class_border;
        font-size:14px;
        padding:0 15px;
    }
  }
  @media screen and(max-width:@change_width){
    .input-line-box {
      width: 100%;
      max-width: 380px;

      label {
        left: 0;
        top: -45px;
      }
    }
    .mobile-box {
      margin-bottom: 47px;
    }
    .btn {
      width: 100%;
      max-width: 380px;
    }
  }
 }
  .step{
      position: relative;
      display: inline-block;
      overflow: hidden;
      margin-top:50px;
      &.step-one{
          &::before{
              background:@main;
          }
      }
      &:before{
          content:'';
          display: block;
          position: absolute;
          left: 54px;
          top:19px;
          width:325px;
          height:2px;
          background:@class_border;
      }
      &:after{
          content:'';
          display: block;
          position: absolute;
          right: 54px;
          top:19px;
          width:325px;
          height:2px;
          background:@class_border;
      }
      .step-item{
          float: left;
          width:90px;
          &.active{
              .step-num{
                  border-color: @main;
                  color:@main;
              }
              .step-name{
                  color:@main;
              }
          }
          .step-num{
              position: relative;
              display:block;
              width:38px;
              height:38px;
              margin:0 auto;
              border:2px solid @class_border;
              font-size:16px;
              line-height: 38px;
              color:@class_border;
              border-radius: 50%;
              background:#fff;
              z-index: 4;
          }
          .step-name{
              font-size:14px;
              line-height:22px;
              margin-top:12px;
              color:@subtitle_color;
          }
      }
      .middle{
          margin:0 256px;
      }
      @media screen and(max-width:@change_width){
        &:before{
          width:calc(50% - 75px);
          left:59px;
        }
        &:after{
          width:calc(50% - 75px);
          right:55px;
        }
        .step-item{
          float:left;
          width:75px;
          .step-name{
              font-size:12px;
              line-height: 12px;
              margin-top:18px;
          }
        }
        .middle{
            margin:0 45px;
        }
      }
  }
  @media screen and(max-width:@change_width){
    .step {
      margin-top: 30px;
    }
  }
</style>
