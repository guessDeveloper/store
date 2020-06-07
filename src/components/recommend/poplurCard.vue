<template>
    <div class="box">
        <div class="title" :style="'color:'+title.titleColor">
             <span class="iconfont" :class="title.titleIcon" ></span>{{title.title}}
        </div>
        <div class="content">
            <ul>
                <li>
                    <card></card>
                </li>
                 <li>
                    <card></card>
                </li>
                 <li>
                    <card></card>
                </li>
                 <li>
                    <card></card>
                </li>
                 <li>
                    <card></card>
                </li>
                 <li>
                    <card></card>
                </li>
                 <li>
                    <card></card>
                </li>
                 <li>
                    <card></card>
                </li>
                 <li>
                    <card></card>
                </li>
                 <li>
                    <card></card>
                </li>

            </ul>
        </div>
    </div>
</template>
<script>
import card from '@/components/recommend/recommendCard'
export default {
    data(){
        return{

        }
    },
    props:{
        title:{
          type:Object
        },
        
    },
    components:{
        card:card
    }
}
</script>
<style lang="less" scoped>
.box{
    width:@max-width;
    margin:0 auto;
    background:#fff;
    .title{
        height:104px;
        font-size: 28px;
        line-height: 104px;
        .iconfont{
          font-size:26px;
          margin-right:7px;
        }
    }
    .content{
        ul{
            .clear();
            li{
                float: left;
                width:20%;
                box-sizing:border-box;
                border-top:1px solid @class_border;
                border-right:1px solid @class_border;
                &:nth-of-type(5n){
                    border-right: 0;
                }
            }
        }
    }
    @media screen and(max-width:@change_width){
        width:100%;
        .title{
            text-align: left;
            padding:0 15px;
            font-size:20px;
            height:70px;
            line-height: 70px;
            .iconfont{
                font-size:20px;
            }
        }
        .content{
            ul{
                margin:0 0 0 15px;
                li{
                    width:calc(50% - 15px);
                    margin-right:15px;
                    border:0;
                }
            }
        }
    }
}
</style>