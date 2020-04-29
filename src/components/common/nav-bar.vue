<template>
 <div class="nav-bar-box">
    <div class="box clear">
        <a href="" class="logo">
            <img src="../../assets/img/logo.png" alt="">
        </a>
        <div class="nav-box">
            <a href="" class="active">首页</a>
            <a href="">淘宝</a>
            <a href="">京东</a>
            <a href="">商城返利</a>
            <a href="">逛街购物</a>
            <a href="">美食广场</a>
        </div>
        <div class="search-box">
            <div class="input-box">
                <div class="select" >
                    拼多多
                </div>
                <input type="text" placeholder="输入商品关键词">
            </div>
            <a href="" class="btn">
                <span class="iconfont iconsousuo"></span><span class="name">搜索</span>
            </a>
        </div>
    </div>
 </div>
</template>
<script>
export default {
    data(){
        return{

        }
    }
}
</script>
<style lang="less" scoped>
@import '../../assets/less/common.less';

.nav-bar-box{
    width:100%;
    height:100px;
    line-height: 100px;
    background: #fff;
    .box{
        width:@max-width;
        height: 100%;
        margin:0 auto;
        overflow: hidden;
        .logo{
            float: left;
            width:174px;
            margin-top:27px;
            margin-right:56px;
            img{
                display: block;
                width:100%;
            }
        }
        .nav-box{
            float: left;
            height:100%;
            font-size:0;
            a{
                display: inline-block;
                height: 100%;
                line-height: 100px;
                font-size:16px;
                color:@font_color;
                margin-right:40px;
                &.active{
                    color:@main;
                }
            }
        }
        .search-box{
            float:right;
            height:40px;
            margin-top:30px;
            .input-box{
                float: left;
                width:298px;
                height:36px;
                border:2px solid @main;
                .select{
                    float: left;
                    width:81px;
                    line-height: 36px;
                }
                input{
                    float: left;
                    margin-top:8px;
                    border:0;
                    height:20px;
                    line-height: 20px;
                    font-size: 14px;
                }

            }
            .btn{
                float: left;
                width:100px;
                height:40px;
                line-height: 40px;
                font-size:18px;
                color:#fff;
                background:@main;
            }
        }
    }
}
@media screen and(max-width:@change_width){
  .nav-bar-box{
    box-sizing: border-box;
    width:100%;
    padding:0 15/@p;
        .box{
            width:100%;
            .logo{
            width:auto;
            width:94/@p;
            height:25px;
            margin-top:17/@p;
            img{
                height:100%;
            }
        }
        .nav-box{
        display: none;
    }
    .search-box{
        width:100%;
        margin-top:14px;
        position: relative;
        .input-box{
            width:100%;
            height:40px;
            box-sizing: border-box;
        }
        .btn{
            position: absolute;
            top:0;
            right:0;
            width:50/@p;
            .name{
                display: none;
            }
        }
    }
    }
    
  }
}
</style>