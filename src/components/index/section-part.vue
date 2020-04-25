<template>
    <div class="box">
        <h3 class="title">
             服装
        </h3>
        <div class="content">
            <div class="left"> 
                <img src="../../assets/img/fuzhuang.png" alt="">
                <div class="name">一体织轻薄羽绒服</div>
                <div class="des">爱人冬天的感觉</div>
                <div class="price">¥249</div>
                <button>查看全部服饰</button>
            </div>
            <div class="right">
                <div class="item">
                    <img src="../../assets/img/fuzhuang.png" alt="">
                    <div class="name">女式超柔软拉毛运动开衫毛衣女式超柔软拉毛运动开衫毛衣…</div>
                    <div class="score">积分：20</div>
                    <div class="price">¥249</div>
                </div>
                <div class="item">
                    <img src="../../assets/img/fuzhuang.png" alt="">
                    <div class="name">女式超柔软拉毛运动开衫毛衣女式超柔软拉毛运动开衫毛衣…</div>
                    <div class="score">积分：20</div>
                    <div class="price">¥249</div>
                </div>
                <div class="item">
                    <img src="../../assets/img/fuzhuang.png" alt="">
                    <div class="name">女式超柔软拉毛运动开衫毛衣女式超柔软拉毛运动开衫毛衣…</div>
                    <div class="score">积分：20</div>
                    <div class="price">¥249</div>
                </div>
                <div class="item">
                    <img src="../../assets/img/fuzhuang.png" alt="">
                    <div class="name">女式超柔软拉毛运动开衫毛衣女式超柔软拉毛运动开衫毛衣…</div>
                    <div class="score">积分：20</div>
                    <div class="price">¥249</div>
                </div>
                <div class="item">
                    <img src="../../assets/img/fuzhuang.png" alt="">
                    <div class="name">女式超柔软拉毛运动开衫毛衣女式超柔软拉毛运动开衫毛衣…</div>
                    <div class="score">积分：20</div>
                    <div class="price">¥249</div>
                </div>
                <div class="item">
                    <img src="../../assets/img/fuzhuang.png" alt="">
                    <div class="name">女式超柔软拉毛运动开衫毛衣女式超柔软拉毛运动开衫毛衣…</div>
                    <div class="score">积分：20</div>
                    <div class="price">¥249</div>
                </div>
                <div class="item">
                    <img src="../../assets/img/fuzhuang.png" alt="">
                    <div class="name">女式超柔软拉毛运动开衫毛衣女式超柔软拉毛运动开衫毛衣…</div>
                    <div class="score">积分：20</div>
                    <div class="price">¥249</div>
                </div>
                <div class="item">
                    <img src="../../assets/img/fuzhuang.png" alt="">
                    <div class="name">女式超柔软拉毛运动开衫毛衣女式超柔软拉毛运动开衫毛衣…</div>
                    <div class="score">积分：20</div>
                    <div class="price">¥249</div>
                </div>
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
.box{
    width:@max-width;
    margin:0 auto;
}
.title{
   font-size:28px;
   height:65px;
   line-height: 65px;
   padding-left:14px;
   text-align: left;
   position: relative;
     &::before{
      content:'';
      display: block;
      position: absolute;
      left:0;
      top:20px;
      width:4px;
      height:24px;
      background:@main;
    } 
}
.content{
    width:100%;
    height:590px;
    .clear();
    .left{
        float:left;
        width: 240px;
        height:100%;
        background:@fuzhuang_color;
        img{
            display: block;
            height:214px;
            margin:95px auto 30px;
        }
        .name{
            font-size:20px;
            line-height: 20px;
            margin-bottom:14px;
            color:#fff;
            font-weight: bold;
        }
        .des{
            line-height: 14px;
            font-size:14px;
            color:#fff;
            
        }
        .price{
            line-height: 32px;
            font-size:32px;
            color:#fff;
            font-weight: bold;
            margin:26px 0;
        }
        button{
            width:118px;
            height:38px;
            border:1px solid #fff;
            border-radius: 20px;
            font-size:12px;
            color:#fff;
            letter-spacing: 0.3px;
            background:none;
        }
    }
    .right{
        float: left;
        width:960px;
        background:#fff;
        height:100%;
        text-align: left;
        .clear();
        .item{
            float: left;
            width:239px;
            height:294px;
            border-right:1px solid @class_border;
            border-bottom:1px solid @class_border;
            &:nth-of-type(4n){
                border-right:1px solid #fff;
            }
            img{
                display: block;
                width:173px;
                margin:0 auto;
            }
            .name{
                margin:0 20px;
                .overTextOne();
                font-size:14px;
                line-height: 14px;
                margin-bottom:8px;
            }
            .score{
                margin:0 20px;
                font-size:12px;
                color:@placeholder_color;
            }
            .price{
                margin:0 20px;
                font-size:14px;
                line-height: 10px;
                margin-top:14px;
                font-weight: bold;
                color:@percent_color;
            }
        }
    }
}
</style>