<template>
  <div class="login">
    <navBar></navBar>
    <div class="content" :style="'background:url('+config.LoginBackgroundImage+') no-repeat center center;'">
      <div class="middle">
        <div class="login-box">
          <div class="tab-box">
            <span :class="{active:type==1}" @click="tabchange(1)">消费者登录</span><span :class="{active:type==2}" @click="tabchange(2)">商家登录</span>
          </div>
          <div class="input-box">
            <span class="iconfont iconzh"></span><input type="text" placeholder="手机号码" v-model.trim="userName" @blur="isLoginCode">
          </div>
          <div class="input-box">
            <span class="iconfont iconmima"></span>
            <input :type="passwordType" placeholder="密码" v-model.trim="password" :class="{show:!isShowPass}" class="password">
            <input type="text" v-model.trim="password" placeholder="密码" :class="{show:isShowPass}" class="password">

            <div class="show-icon" @click="showPass">
              <div class="icon iconfont iconyanjingk" v-show="isShowPass"></div>
              <div class="icon iconfont" v-show="!isShowPass">
                <img src="../../assets/img/icon-passClose.png" alt="">
              </div>
            </div>
          </div>
          <div class="input-box" v-if="needCode == 'true'">
            <span class="iconfont icondxyzm"></span><input type="text" placeholder="输入短信验证码" v-model.trim="msgCode" maxlength="6"><button class="msg-btn" @click="getMsgCode">{{codeBtn}}</button>
          </div>
          <div class="input-check-box">
            <el-checkbox v-model="checked" class="check-box">保持登录状态</el-checkbox>
          </div>
          <button class="btn login-btn" @click="login" :disabled="loginBtnLock">登录</button>
          <div class="other">
            <a class="forget-btn" @click="reset">忘记密码？</a>
            <a class="regeter-btn" @click="register" v-show="type == 1">新消费者注册</a>
            <a class="regeter-btn" @click="register" v-show="type == 2">新商家注册</a>
          </div>
        </div>
      </div>
    </div>
    <footerBar :isLogin="true"></footerBar>
    <div class="phone-footer-box">
      <phoneFooter></phoneFooter>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex' //注册 action 和 state
import navBar from '@/components/login/login-nav'
import '../../plugins/element-checkbox.js'
import phoneFooter from '@/components/common/phoneFooter'
import footerBar from '@/components/common/footer'
export default {
  data() {
    return {
      type: '1',
      userName: '',
      password: '',
      needCode: false,
      msgCode: '',
      lock: false,
      count: 60,
      timer: '',
      codeBtn: '获取验证码',
      loginBtnLock: false,
      passwordType: 'password',
      isShowPass: false,
      checked: false
    }
  },
  mounted() {
    if (this.$util.getCookie('userPassword')) {
      let userData = JSON.parse(this.$util.getCookie('userPassword'))
      this.userName = userData.userName
      this.password = userData.userPassword
      this.checked = true
    }
    window.toast = this.$message;
  },
  components: {
    footerBar: footerBar,
    navBar: navBar,
    phoneFooter: phoneFooter
  },
  computed: {
    ...mapState([
      'config'
    ])
  },
  methods: {
    tabchange(type) {
      this.type = type
      this.userName = ''
      this.password = ''
      this.needCode = false
      if (this.$util.getCookie('userPassword')) {
        let userData = JSON.parse(this.$util.getCookie('userPassword'))
        this.userName = userData.userName
        this.password = userData.userPassword
        this.checked = true
      }
    },
    login() {
      if (this.checkLogin()) {
        if (this.type == 1) {
          this.userLogin()
        } else {
          this.storeLogin()
        }
      }
    },
    //查询是否需要验证码
    isLoginCode() {
      if (this.userName !== '') {
        if (this.type == '1') {
          this.$http.post(this.$api.UserLoginIsNeedVerify, { UserName: this.userName }).then(res => {
            if (res.data.Code == 1) {
              this.needCode = res.data.Data
            }
          })
        } else {
          this.$http.post(this.$api.MerchantLoginIsNeedVerify, { Account: this.userName }).then(res => {
            if (res.data.Code == 1) {
              this.needCode = res.data.Data
            }
          })
        }
      }
    },
    //忘记密码
    reset() {
      if (this.type == 1) {
        this.$router.push('/reset')
      } else {
        this.$router.push('/reset?type=2')
      }
    },
    checkLogin() {
      if (this.userName == '') {
        this.$message.error('请输入用户名称/手机号码')
        return false
      } else if (this.password == '') {
        this.$message.error('请输入密码')
      } else if (this.needCode == 'true' && this.msgCode == '') {
        this.$message.error('请输入短信验证码')
        return false
      } else {
        return true
      }
    },
    //获取短信验证码
    getMsgCode() {
      if (this.lock == true) return false
      this.lock = true
      if (this.type == 1) {
        this.$http.post(this.$api.UserLoginSendVerifyCode, { UserName: this.userName }).then(res => {
          if (res.data.Code == 1) {
            this.setCode()
          } else {
            this.lock = false;
            this.$message.error(res.data.Msg)
          }
        }).catch(res => {
          this.lock = false
          this.$message.error(res.data.Msg)
        })
      } else {
        this.$http.post(this.$api.MerchanterSendVerifyCode, { MName: this.userName }).then(res => {
          if (res.data.Code == 1) {
            this.setCode()
          } else {
            this.lock = false;
            this.$message.error(res.data.Msg)
          }
        }).catch(res => {
          this.lock = false;
          this.$message.error(res.data.Msg)
        })
      }
    },
    //验证码倒计时
    setCode() {
      this.count--
      this.codeBtn = `${this.count}s`
      clearInterval(this.timer)
      this.timer = setInterval(() => {
        if (this.count == 1) {
          clearInterval(this.timer);
          this.lock = false;
          this.codeBtn = '获取验证码';
          this.count = 60;
        } else {
          this.count--;
          this.codeBtn = `${this.count}s`
        }
      }, 1000)
    },
    //用户登录
    userLogin() {
      this.loginBtnLock = true
      this.$http.post(this.$api.Login, {
        UserName: this.userName,
        UserPassword: this.password,
        VerifyCode: this.msgCode

      }).then(res => {
        if (res.data.Code == 1) {
          localStorage.setItem('token', res.data.Data)
          this.savePass();
          //获取pdd 授权
          this.getPddPass();
          // this.$router.push('/persion')
        } else {
          this.isLoginCode();
          this.$message.error(res.data.Msg)
        }
        this.loginBtnLock = false
      }).catch(res => {
        this.loginBtnLock = false
      })
    },
    //商家注册
    storeLogin() {
      this.loginBtnLock = true;
      this.$http.post(this.$api.storeLogin, {
        Account: this.userName,
        passwd: this.password,
        VerifyCode: this.msgCode

      }).then(res => {
        if (res.data.Code == 1) {
          localStorage.setItem('storeToken', res.data.Data)
          this.savePass();
          this.$router.push('/store')

        } else if (res.data.Code == 4) {
          localStorage.setItem('storeToken', res.data.Data)
          this.savePass();
          this.$router.push('/store')
          this.$alert.alert(res.data.Msg, {
            confirmButtonText: '知道了',
          })
        } else {
          this.isLoginCode();
          this.$message.error(res.data.Msg)
        }
        this.loginBtnLock = false;
      }).catch(res => {
        this.loginBtnLock = false;
      })
    },
    register() {
      this.type == 1 ? this.$router.push('/register') : this.$router.push('/register?isStore=1')
    },
    //显示密码
    showPass() {
      if (this.passwordType == 'password') {
        this.passwordType = 'text';
        this.isShowPass = true
      } else {
        this.passwordType = 'password'
        this.isShowPass = false
      }

    },
    //保存登录账号
    savePass() {
      if (this.checked == true) {
        let userData = {
          userName: this.userName,
          userPassword: this.password
        }
        this.$util.setCookie('userPassword', JSON.stringify(userData), 7);
      } else {
        this.$util.setCookie('userPassword', '', -1);
      }
    },
    //查看拼多多是否授权
    getPddPass() {
      this.$http.limitGet(this.$api.GetUserIsKeepOnRecord).then(res => {
        if (res.data.Code == 1) {
          console.log(res)
          if (res.data.Data.IsKeepOnRecord == false) {
            this.getPddPassLink();
          } else {
            this.$router.push('/persion')
          }
        } else {
          this.$router.push('/persion')
        }
      })
    },
    //获取授权链接
    getPddPassLink() {
      this.$http.limitGet(this.$api.UserKeepOnRecord).then(res => {
        this.$router.push('/persion')
        if (res.data.Code == 1) {
          // this.$alert.confirm('确认授权？')
          //   .then(_ => {
          //     console.log(res)
          //     window.location.open(res.data.Data.url, '_blank')
          //   })
          //   .catch(_ => { });
          // this.$alert.alert(`<iframe src=${res.data.Data.url} width="100%" height="400px" style="border:0;height:70vh;" sandbox="allow-same-origin allow-scripts allow-top-navigation"></iframe>`, '拼多多授权', {
          //   dangerouslyUseHTMLString: true,
          //   showConfirmButton: false
          // });
          this.$alert.alert(`<div class="pdd-porint-box"><div>本站拼多多产品需提前授权</div><a href=${res.data.Data.url} class="go" target="_blank">立即前往</a></div>`, '拼多多授权', {
            dangerouslyUseHTMLString: true,
            showConfirmButton: false
          });
        } else {

        }
      })
    },
    changeSave() {

    }
  }
}
</script>
<style lang="less" scoped>
.content {
  width: 100%;
  min-width: @max-width;
  height: 680px;
  text-align: center;
  background: url(../../assets/img/logon-bc.png) no-repeat center center;
  background-size: auto 100% !important;
  .middle {
    width: @max-width;
    margin: 0 auto;
    .clear();
    .login-box {
      box-sizing: border-box;
      float: right;
      width: 500px;
      height: 560px;
      margin-top: 60px;
      padding: 0 60px;
      background: #fff;
      .tab-box {
        position: relative;
        height: 30px;
        line-height: 30px;
        font-size: 24px;
        color: @subtitle_color;
        padding: 67px 0 50px;
        &::before {
          content: "";
          position: absolute;
          top: 67px;
          left: 190px;
          display: block;
          width: 1px;
          height: 30px;
          background: #f1f2fb;
        }
        span {
          display: inline-block;
          width: 50%;
          cursor: pointer;
          &.active {
            color: @main;
          }
        }
      }
    }
  }
  @media screen and(max-width:@change_width) {
    background: none;
    min-width: 100%;
    height: auto;
    .middle {
      width: 100%;
      overflow: hidden;
      .login-box {
        width: auto;
        float: none;
        margin: 15px;
        padding: 0 15px;
        .tab-box {
          height: 28px;
          line-height: 28px;
          font-size: 18px;
          padding: 30px 0 48px;
          &::before {
            content: "";
            position: absolute;
            top: 26px;
            left: 50%;
            display: block;
            width: 1px;
            height: 30px;
            background: #f1f2fb;
          }
        }
      }
    }
  }
}
.input-check-box {
  text-align: left;
}
.input-box {
  position: relative;
  height: 50px;
  margin-bottom: 20px;
  .password {
    display: none;
    &.show {
      display: block;
    }
  }

  .iconfont {
    position: absolute;
    left: 22px;
    top: 10px;
    font-size: 20px;
    color: @placeholder_color;
  }
  .icondxyzm {
    font-size: 14px;
    top: 16px;
  }
  .msg-btn {
    position: absolute;
    top: 14px;
    right: 20px;
    font-size: 14px;
    color: @main;
    height: 22px;
    text-align: right;
  }
  .show-icon {
    position: absolute;
    top: 0;
    left: auto;
    right: 20px;
    width: 16px;
    height: 100%;
    line-height: 50px;
    font-size: 10px;
    color: @main;
    cursor: pointer;
    .icon {
      position: static;
      display: block;
      color: @main;
      line-height: 50px;
      vertical-align: middle;
      font-size: 10px;
      &.iconyanjingg {
      }
    }
  }
  input {
    display: block;
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    padding-left: 60px;
    font-size: 14px;
    border: 1px solid @class_border;
    -webkit-appearance: none;
  }
}
.login-btn {
  display: block;
  width: 100%;
  height: 50px;
  margin-top: 40px;
  border: 0;
  background: @main;
  color: #fff;
  font-size: 16px;
  &:disabled {
    background: @btn-active;
  }
  &:active {
    background: @btnActiveColor;
  }
}
.other {
  .clear();
  margin-top: 20px;
  line-height: 14px;
  .forget-btn {
    float: left;
    font-size: 14px;
    color: #464855;
  }
  .regeter-btn {
    float: right;
    font-size: 14px;
    color: @main;
  }
}
//底部footer
.phone-footer-box {
  display: none;
  @media screen and(max-width:@change_width) {
    & {
      display: block;
      width: 100%;
      height: 56 / @p;
    }
  }
}
</style>