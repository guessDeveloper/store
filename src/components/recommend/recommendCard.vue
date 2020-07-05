<template>
    <a class="item" :href="item.ClickUrl" >
        <div class="img-box">
             <img src="../../assets/img/1-1.jpg" alt="" class="hide-img">
             <img :src="item.picurl" alt="" class="show-img">
        </div>
       
        <h4>{{item.titleA}}</h4>
        <p>{{item.titleB}}</p>
        <span class="price">¥{{item.price}}</span>
    </a>
</template>
<script>
export default {
    data(){
        return{

        }
    },
    props:{
        item:{
          type:Object
        }
    },
    methods:{
        
    }
}
</script>
<style lang="less" scoped>
.item{
    display: block;
    width:100%;
    height: 325px;
    overflow: hidden;
    color:@font_color;
    text-align: center;
    .img-box{
        position: relative;
        width:180px;
        margin:30px auto 29px;
        overflow: hidden;
        .hide-img{
            display: block;
            width:100%;
            opacity: 0;
        }
        .show-img{
            position: absolute;
            top:50%;
            left:0;
            // margin-top:-50%;
            transform: translateY(-50%);
            width:100%;
        }
    }
   
    h4{
        font-size:14px;
        line-height: 14px;
        margin-bottom: 14px;
        .overTextOne();
    }
    p{
        font-size:12px;
        color:@subtitle_color;
        line-height: 12px;
        margin-bottom:12px;
    }
    .price{
        font-size:16px;
        line-height: 16px;
        color:@percent_color;
        font-weight: bold;
    }
    @media screen and(max-width:@change_width){
        width:100%;
        height:auto;
        .img-box{
            width:100%;
        }
        img{
            display: block;
            width:100%;
            height:auto;
        }
    }
}
</style>
