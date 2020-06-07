<template>
    <div class="item">
        <img src="../../assets/img/good.png" alt="">
        <h4>女式超柔软拉毛运动开衫</h4>
        <p>积分约：50</p>
        <span class="price">¥249</span>

    </div>
</template>
<style lang="less" scoped>
.item{
    width:100%;
    height: 325px;
    overflow: hidden;
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
<script>
export default {
    data(){
        return{

        }
    }
}
</script>