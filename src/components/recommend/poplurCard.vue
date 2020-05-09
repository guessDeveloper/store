<template>
    <div class="box">
        <div class="title">
             24小时热销
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
}
</style>