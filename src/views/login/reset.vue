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
                <label for="">用户名称：</label> <input type="text" placeholder="用户名称/手机号码">
            </div>
            <div class="input-line-box">
                <label for="">图形验证码：</label><input type="text" placeholder="输入图形验证码">
            </div>
            <div class="input-line-box">
                <img src="" alt="" class="code">  <button class="img-reset">看不清？<span>换一张</span></button>
            </div>
            <button class="btn submit" @click="step=2">下一步</button>
        </div>
        <div class="tab-item" :class="{active:step == 2}">
            <div style="height:40px;"></div>
            <div class="input-line-box">
                <label for="">昵称：</label><input type="text" value="dsdfsf" readonly class="readonly">
            </div>
            <div class="input-line-box">
                <label for="">手机号：</label> <input type="text" value="fsdfs" readonly class="readonly">
            </div>
            <div class="input-line-box">
                <label for="">短信验证码：</label><div class="input-box"><input type="text" placeholder="输入短信验证码"><span class="getCode">获取验证码</span></div> 
            </div>
            <div class="input-line-box">
                <label for="">新的密码：</label><input type="password" placeholder="设置6至20位登录密码">
            </div>
            <div class="input-line-box">
                <label for="">重复密码：</label><input type="password" placeholder="请再次输入登录密码">
            </div>
            <button class="btn submit" @click="step=3">下一步</button>
        </div>
        <div class="tab-item" :class="{active:step == 3}">
             <span class="iconfont iconqrwc icon-complate"></span>
             <div class="step-name">密码重置成功</div>
             <div class="step-tip">下次请使用新密码进行登录</div>
             <button class="btn submit" style="margin-top:50px;">进入首页</button>
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
           step:'1'
        }
    },
    components:{
        footerBar:footerBar,
        navBar:navBar
    },
}
</script>
<style lang="less" scoped>
.reset-box{
    width:@max-width;
    height:630px;
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
            font-size:14p;
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
}
.code{
    width:150px;
    height:50px;
    margin-right:20px;
}
.img-reset{
    border:0;
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