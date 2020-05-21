<template>
    <div class="card">
        <div class="img-box"></div>
        <div class="name">当当网</div>
        <div class="persiont">最高返<span>4%</span></div>
    </div>
</template>
<script>
export default {
    data(){

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
}
</style>