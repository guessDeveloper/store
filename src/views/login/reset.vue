<template>
    <div class="">
        <navBar type="reset"></navBar>
        <div class="reset-box">
            <div class="step step-one" v-show="step != 3">
                <div class="step-item" :class="{active:step >= 1}">
                    <span class="step-num">1</span>
                    <div class="step-name">填写账户名</div>
                </div>
                <div class="step-item middle" :class="{active:step >= 2}">
                    <span class="step-num">2</span>
                    <div class="step-name">设置新密码</div>
                </div>
                <div class="step-item" :class="{active:step >= 3}">
                    <span class="step-num">3</span>
                    <div class="step-name">完成</div>
                </div>
            </div>
       
        <div class="tab-item" :class="{active:step == 1}">
            <div class="first-margin"></div>
            <div class="input-line-box">
                <label for="">用户名称：</label> <input type="text" placeholder="用户名称/手机号码" v-model.trim="userNmae">
            </div>
            <div class="input-line-box">
                <label for="">图形验证码：</label><input type="text" placeholder="输入图形验证码" v-model.trim="imgCode">
            </div>
            <div class="input-line-box" style="overflow:hidden">
                <img :src="imgUrl" alt="" class="code">  <button class="img-reset" @click="getImageUrl">看不清？<span>换一张</span></button>
            </div>
            <button class="btn submit" @click="stepOne">下一步</button>
        </div>
        <div class="tab-item" :class="{active:step == 2}">
            <div style="height:40px;"></div>
            <div class="input-line-box">
                <label for="">昵称：</label><input type="text" :value="lockUserName" readonly class="readonly">
            </div>
            <div class="input-line-box">
                <label for="">手机号：</label> <input type="text" :value="lockUserTel" readonly class="readonly">
            </div>
            <div class="input-line-box">
                <label for="">短信验证码：</label><div class="input-box"><input type="text" placeholder="输入短信验证码" v-model.trim="msgCode"><span class="getCode" @click="getCode">{{codeBtn}}</span></div> 
            </div>
            <div class="input-line-box">
                <label for="">新的密码：</label><input type="password" placeholder="请输入新密码" v-model.trim="newPwd" minlength="6" maxlength="20"> 
            </div>
            <div class="input-tip-box">
                	请输入最小为8位至少包含1个大写字母，1个小写字母和1个数字的密码,可使用标点符号并且不能连续输入相同大小写字母数字3次或3次以上
            </div>
            <div class="input-line-box">
                <label for="">重复密码：</label><input type="password" placeholder="请再次输入登录密码" v-model.trim="rePwd" maxlength="20">
            </div>
            <button class="btn submit" @click="resetcheck">下一步</button>
        </div>
        <div class="tab-item" :class="{active:step == 3}">
             <span class="iconfont iconqrwc icon-complate"></span>
             <div class="step-name">密码重置成功</div>
             <div class="step-tip">下次请使用新密码进行登录</div>
             <router-link class="btn submit" style="margin-top:50px;" tag="button" to="/login">登录</router-link>
        </div>
        <div>
            
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
           type:1, // 1 用户找回密码 2 商家找回密码
           step:'1',
           userNmae:'',
           imgCode:'',
           imgUrl:'',
           lockUserName:'',
           lockUserTel:'',
           codeBtn:'获取验证码',
           count:60,
           lock:false,
           msgCode:'',
           newPwd:'',
           rePwd:''
        }
    },
    components:{
        footerBar:footerBar,
        navBar:navBar
    },
    mounted(){
        if(this.$route.query.type){
            this.type = this.$route.query.type
        }
        this.getImageUrl();
    },
    methods:{
        stepOne(){
            if(this.userNmae == ''){
                this.$message.error('请输入用户名/手机号')
            }else if(this.imgCode == ''){
                this.$message.error('请输入图形验证码')
            }else{
                if(this.type == 1){
                    this.userImgCheck()
                }else{
                    this.storeImgCheck()
                }
            }
        },
        //用户校验
        userImgCheck(){
            this.$http.post(this.$api.UserForgetUserNameAndImgCode,{
                UserName:this.userNmae,
                ImgVerifyCode:this.imgCode,
            }).then(res=>{
                if(res.data.Code == 1){
                    this.lockUserTel = res.data.Data.UserTel
                    this.lockUserName = res.data.Data.NickName
                    this.step = '2'
                }else{
                    this.$message.error(res.data.Msg)
                }
            })
        },
        //商家图形校验
        storeImgCheck(){
            this.$http.post(this.$api.MerchanteForgetUserNameAndImgCode,{
                MerchantName:this.userNmae,
                ImgVerifyCode:this.imgCode
            }).then(res=>{
                if(res.data.Code == 1){
                    this.lockUserName = res.data.Data.MerchantName
                    this.lockUserTel =  res.data.Data.MerchantTel
                    this.step = '2'
                }else{
                    this.$message.error(res.data.Msg)
                }
            })
        },
        //图像验证码
        getImageUrl(){
            let date = new Date();
            const Url = process.env.NODE_ENV === 'production' ? `https://api.youledui.com/${this.$api.GetVerificationCode}?time=${date.getTime()}` : `/Sev${this.$api.GetVerificationCode}?time=${date.getTime()}`
            console.log('111')
            this.imgUrl = Url
        },
        //获取短信验证码
        getCode(){
            if(this.lock)return false
            this.lock = true;
            if(this.type == 1){
                this.$http.post(this.$api.UserForgetPWDSendVerifyCode,{UserName:this.lockUserName,UserTel:this.lockUserTel}).then(res=>{
                    if(res.data.Code == 1){
                        this.setCode();
                    }else{
                        this.$message.error(res.data.Msg)
                    }
                this.lock = false
                }).catch(()=>{
                    this.lock = false
                })
            }else{
                this.$http.post(this.$api.MerchanteForgetPWDSendVerifyCode,{Name:this.lockUserTel}).then(res=>{
                    if(res.data.Code == 1){
                        this.setCode();
                    }else{
                        this.$message.error(res.data.Msg)
                    }
                this.lock = false
                }).catch(()=>{
                    this.lock = false
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
        //校验
        resetcheck(){
            console.log(this.type)
           if(this.msgCode == ''){
             this.$message.error('请输入短信验证码')
           }else if(this.newPwd.length<6){
             this.$message.error('请输入6至20位登录密码')
           }else if(this.newPwd !== this.rePwd){
             this.$message.error('两次输入密码不一致')
           }else{
              
               if(this.type == 1){
                    this.restPas()
               }else{
                   this.storeRest()
               }
           }
            
        },
        //用户重置密码
        restPas(){
          this.$http.post(this.$api.UserForgetPWD,{
              UserName:this.lockUserName,
              UserTel:this.lockUserTel,
              VerifyCode:this.msgCode,
              UserPWD:this.newPwd
          }).then(res=>{
              if(res.data.Code == 1){
                  this.step = '3'
              }else{
                  this.$message.error(res.data.Msg)
              }
          })
        },
        //商家重置密码
        storeRest(){
            this.$http.post(this.$api.MerchanteForgetPWD,{
                "Name": this.lockUserTel,
                "Tel": this.lockUserTel,
                "VerifyCode": this.msgCode,
                "PWD": this.newPwd
            }).then(res=>{
              if(res.data.Code == 1){
                  this.step = '3'
              }else{
                  this.$message.error(res.data.Msg)
              }
          })
        }
    },

}
</script>
<style lang="less" scoped>
.reset-box{
    width:@max-width;
    height:680px;
    text-align: center;
    background:#fff;
    margin:20px auto;
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
            width:288px;
            height:2px;
            background:@class_border;
        }
        &:after{
           content:'';
            display: block;
            position: absolute;
            right: 54px;
            top:19px;
            width:288px;
            height:2px;
            background:@class_border; 
        }
        .step-item{
            float: left;
            width:70px;
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
    }
    @media screen and(max-width:@change_width){
        width:auto;
        margin:15px;
        height:auto;
        padding-bottom:50px;
        overflow:hidden;
        .step{
           
           &:before{
              
               width:calc(50% - 60px);
               left:50px;
           }
           &:after{
              width:calc(50% - 60px);
              right:50px;
           }
            .step-item{
              float:left;
              width:60px;
              .step-name{
                  font-size:12px;
                  line-height: 12px;
                  margin-top:18px;
              }
            }
            .middle{
                margin:0 70px;
            }
        }
        
    }
}
.tab-item{
    display: none;
    width:380px;
    margin:0 auto;
    &.active{
        display: block;
    }
    .first-margin{
        height:80px;
    }
    .input-tip-box{
        color:@placeholder_color;
        text-align: left;
        margin-bottom:20px;
    }
    .input-line-box{
        position: relative;
        width:100%;
        margin-bottom:20px;
        label{
            position: absolute;
            top:0;
            text-align: right;
            right:380px;
            width:100px;
            line-height: 50px;
            color:#464855;
            font-size:12px;
            padding-right:15px;

        }
        input{
            display: block;
            box-sizing: border-box;
            width:100%;
            height:50px;
            border:1px solid @class_border;
            font-size:14px;
            padding:0 15px;
            &.readonly{
                background:@readOnly;
                
            }
        }
    }
    @media screen and(max-width:@change_width){
        width:auto;
        margin:0 15px;
        .first-margin{
            display: none;
        }
        .input-line-box{
            width:auto;
            margin-top:46px;
            label{
                left:0;
                right:auto;
                text-align: left;
                line-height: 38px;
                top:-38px;
            }
            input{
                box-sizing: border-box;
            }
        }
    }
}
.code{
    float: left;
    width:150px;
    height:50px;
    margin-right:20px;
    cursor: pointer;
}
.img-reset{
    float: left;
    vertical-align: middle;
    border:0;
    margin-top:11px;
    font-size: 14px;
    span{
        color:@main;
    }
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
.input-box{
     position: relative;
    .getCode{
        position: absolute;
        right:20px;
        top:14px;
        line-height: 22px;
        font-size:14px;
        color:@main;
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
</style>