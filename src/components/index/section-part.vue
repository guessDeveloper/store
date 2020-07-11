<template>
    <div class="box">
        <h3 class="title">
             {{config.titleA}}
        </h3>
        <div class="content">
            <div class="left" :class="{canchu:config.type==2,peijian:config.type==3,jujia:config.type ==4}"> 
                <img :src="config.CateGorysItems[0]?config.CateGorysItems[0].picurl:''" alt="">
                <div class="name">{{config.CateGorysItems[0]?config.CateGorysItems[0].titleA:''}}</div>
                <div class="des">{{config.CateGorysItems[0]?config.CateGorysItems[0].titleB:''}}</div>
                <div class="price">¥{{config.CateGorysItems[0]?config.CateGorysItems[0].price:''}}</div>
                <a :href="config.ClassUrl"  class="btn" target="_blank">查看全部服饰</a>
            </div>
            <div class="right">
                <a class="item" v-for="(item,index) in config.CateGorysItems" :key="index" :class="{none:index == 0}" :href="item.Url" target="_blank">
                    <div class="img-box">
                        <img src="../../assets/img/1-1.jpg" alt="" class="hide-img">
                        <el-image :src="item.picurl" lazy class="img" fit="contain">
                            <div slot="placeholder" class="image-slot">
                            加载中<span class="dot">...</span>
                            </div>
                        </el-image>
                    </div>
                    <!-- <img :src="item.picurl" alt=""> -->
                    <div class="name">{{item.titleA}}</div>
                    <div class="score">{{item.titleB}}</div>
                    <div class="price">¥{{item.price}}</div>
                     <!-- <div class="commend">
                        <div class="commend-content">快递收到了，下单发货挺快的，快递也挺好的快递收到了，下单发货挺快的，快递也挺好的</div>
                        <div class="commend-from">— 来自于 Windir 的评论</div>
                    </div> -->
                </a>
            </div>
        </div>
        <a class="more" :href="config.ClassUrl">查看更多</a>
    </div>
</template>
<script>
export default {
    data(){
        return{

        }
    },
    props:{
        config:{

        }
    }
}
</script>
<style lang="less" scoped>
.box{
    width:@max-width;
    margin:0 auto 20px;
     @media screen and(max-width:@change_width) {
       width: 100%;  
     }  
}
.more{
    display: none;

    @media screen and(max-width:@change_width) {
        display:block;
        margin:30px auto 5px; 
        width:180px;
        height:40/@p;
        font-size:14/@p;
        color:@main;
        line-height: 40/@p;
        border:1px solid @main;
        border-radius: 40/@p; 
     }
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
   @media screen and(max-width:@change_width) {
     display: none;    
   }  
}
.content{
    width:100%;
    height:590px;
     @media screen and(max-width:@change_width) {
        height:auto;    
    } 
    .clear();
    .left{
        float:left;
        width: 240px;
        height:100%;
        background:@fuzhuang_color;
        &.canchu{
            background:@canchu_color;
        }
        &.peijian{
            background:@peijian_color;
        }
        &.jujia{
            background:@jujia_color;
        }
        @media screen and(max-width:@change_width) {
            display: none;    
        } 
        img{
            display: block;
            height:214px;
            margin:95px auto 30px;
        }
        .name{
            width:80%;
            .overTextOne();
            font-size:20px;
            line-height: 20px;
             margin:0 auto;
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
        .btn{
            display: inline-block;
            width:118px;
            height:38px;
            line-height: 38px;
            border:1px solid #fff;
            border-radius: 20px;
            font-size:12px;
            color:#fff;
            letter-spacing: 0.3px;
            background:none;
            transition: all .3s ease;
            &:hover{
                background:#fff;
                color:@main;
            }
        }
    }
    .right{
        float: left;
        width:960px;
        background:#fff;
        height:100%;
        text-align: left;
         @media screen and(max-width:@change_width) {
            width: 100%;   
        } 
        .clear();
        .item{
            position: relative;
            float: left;
            width:239px;
            height:294px;
            overflow: hidden;
            text-align: center;
            color:@font_color;
            border-right:1px solid @class_border;
            border-bottom:1px solid @class_border;
            &.none{
                display: none;
            }
            &:nth-of-type(4n){
                border-right:1px solid #fff;
            }
            &:hover{
                .commend{
                    bottom:0;
                }
            }
            .img-box{
                position: relative;
                display: block;
                width:173px;
                margin:17px auto 19px;
                cursor: pointer;
                .hide-img{
                    display: block;
                    width:100%;
                    opacity: 0;
                }
                .img{
                    position: absolute;
                    left:0;
                    top:0;
                    width:100%;
                }
            }
            .name{
                margin:0 20px;
                .overTextOne();
                font-size:14px;
                line-height: 15px;
                margin-bottom:8px;
                transition: color .3s ease;
                cursor: pointer;
                &:hover{
                    color:@main;
                }
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
            .commend{
                position:absolute;
                left:0;
                bottom:-100%;
                width:100%;
                height:100px;
                background:#eee;
                transition: all .5s ease;
                .commend-content{
                    margin:17px 20px 0;
                    font-size:12px;
                    line-height: 20px;
                    .overTextLine(2);
                }
                .commend-from{
                    margin:10px 20px 0;
                    line-height: 17px;
                    font-size:12px;
                    color:@subtitle_color;
                }
            }
            @media screen and(max-width:@change_width) {
                box-sizing: border-box;
                width: 50%;   
                .img-box{
                    width:80%;
                }
            } 
        }
    }
     
}

</style>