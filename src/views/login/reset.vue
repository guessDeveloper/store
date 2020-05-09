<template>
    <div class="">
        <navBar type="reset"></navBar>
        <div class="reset-box">
            <div class="step step-one">
                <div class="step-item active">
                    <span class="step-num">1</span>
                    <div class="step-name">填写账户名</div>
                </div>
                <div class="step-item middle" >
                    <span class="step-num">2</span>
                    <div class="step-name">设置新密码</div>
                </div>
                <div class="step-item">
                    <span class="step-num">3</span>
                    <div class="step-name">完成</div>
                </div>
            </div>
        </div>
        <div class="tab-item">
            <div class="input-line-box">
                <label for="">用户名称：</label> <input type="text" placeholder="用户名称/手机号码">
            </div>
            <div class="input-line-box">
                <label for="">图形验证码：</label><input type="text" placeholder="输入图形验证码">
            </div>
            <div>
                <img src="" alt="">  <button>看不清？<span>换一张</span></button>
            </div>
            <button class="btn submit">下一步</button>
        </div>
        <div>
            <div class="input-line-box">
                <label for="">昵称：</label><input type="text" value="" readonly>
            </div>
            <div class="input-line-box">
                <label for="">手机号：</label> <input type="text" value="" readonly>
            </div>
            <div class="input-line-box">
                <label for="">短信验证码：</label><div class="input-box"><input type="text" placeholder=""><span>输入短信验证码</span></div> 
            </div>
            <div class="input-line-box">
                <label for="">新的密码：</label><input type="password" placeholder="设置6至20位登录密码">
            </div>
            <div class="input-line-box">
                <label for="">重复密码：</label><input type="password" placeholder="请再次输入登录密码">
            </div>
            <button class="btn submit">下一步</button>
        </div>
        <div>
            
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
        navBar:navBar
    },
}
</script>
<style lang="less" scoped>
.reset-box{
    width:@max-width;
    height:630px;
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
</style>