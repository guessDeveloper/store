<template>
    <a class="item" :href="item.ClickUrl" >
        <img :src="item.picurl" alt="">
        <h4>{{item.titleA}}</h4>
        <p>{{item.Fanli}}</p>
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
    img{
        display: block;
        width:180px;
        height:180px;
        margin:30px auto 29px;
    }
    h4{
        font-size:14px;
        line-height: 14px;
        margin-bottom: 14px;
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
        img{
            display: block;
            width:100%;
            height:auto;
        }
    }
}
</style>
