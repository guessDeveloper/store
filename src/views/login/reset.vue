<template>
    <div class="">
        <navBar type="reset"></navBar>
        <div class="reset-box">
            <div class="step">
                <div class="step-item">
                    <span class="step-num">1</span>
                    <div class="step-name">填写账户名</div>
                </div>
                <div class="step-item">
                    <span class="step-num">2</span>
                    <div class="step-name">设置新密码</div>
                </div>
                <div class="step-item">
                    <span class="step-num">3</span>
                    <div class="step-name">完成</div>
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
        .step-item{
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
                display:block;
                width:38px;
                height:38px;
                border:2px solid @class_border;
                font-size:16px;
                line-height: 38px;
                color:@class_border;
                border-radius: 50%;
            }
            .step-name{
                font-size:14px;
                line-height:14px;
                color:@subtitle_color;
            }
        }
    }
}
</style>