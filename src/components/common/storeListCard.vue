<template>
    <div class="card">
        <div class="img-box">
            <img :src="data.picurl" alt="">
        </div>
        <div class="name">{{data.title}}</div>
        <div class="persiont">最高返<span>4%</span></div>
    </div>
</template>
<script>
export default {
    data(){
       return{

       }
    },
    props:{
        data:{
            type:Object
        }
    }

}
</script>
<style lang="less" scoped>
.card{
    width:100%;
    height:240px;
    text-align: center;
    .img-box{
        width:100px;
        height:100px;
        border-radius: 100px;
        background:#ccc;
        margin:40px auto 20px;
        overflow: hidden;
        img{
            display: block;
            width:100%;
            height:100%;
        }
    }
    .name{
        font-size:14px;
        line-height: 14px;
    }
    .persiont{
        font-size:13px;
        line-height: 14px;
        margin-top:10px;
        color:@placeholder_color;
        span{
            color:@percent_color;
        }
    }
    @media screen and(max-width:@change_width){
       &{
           height:157px;
           .img-box{
               width:60px;
               height:60px;
               border-radius: 60px;
               margin:29px auto 10px;
           }
           .name{
               font-size:12px;
               line-height: 12px;
           }
           .persiont{
               font-size:10px;
               line-height: 10px;
               
           }
       }
       
    }
}
</style>