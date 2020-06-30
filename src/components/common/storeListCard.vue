<template>
    <a class="card"  target="_blank">
        <div class="img-box" :style='"background-image:url("+data.picurl+");"'>
            <!-- <img :src="data.picurl" alt=""> -->
        </div>
        <div class="name">{{data.title}}</div>
        <div class="persiont">{{data.fanli}}</div>
    </a>
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
    display: block;
    width:100%;
    height:240px;
    color:@font_color;
    text-align: center;
    .img-box{
        width:100px;
        height:100px;
        // border-radius: 100px;
        // background:#ccc;
        margin:40px auto 20px;
        overflow: hidden;
        background-position: center center;
        background-repeat: no-repeat;
        background-size:contain;
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