<template>
  <div class="item">
     <img src="../../assets/img/good.png" alt="">
     <h4>女式坑条冰纱短袖针织衫</h4>
     <p>积分约：50</p>
     <div class="price">¥249</div>
     <button class="add">加入购物车</button>
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
.item{
  width:100%;
  padding-bottom:50px;
  img{
    display:block;
    width:265px;
    height:265px;
    margin:0 auto 20px;
  }
  h4{
    font-size:14px;
    line-height: 14px;
  }
  p{
    font-size:12px;
    color:@subtitle_color;
    line-height: 12px;
    margin-top:12px;
  }
  .price{
    font-size:16px;
    font-weight: bold;
    color:@percent_color;
    line-height: 12px;
    margin-top:12px;
  }
  .add{
    width:100px;
    height:26px;
    margin-top:15px;
    font-size:12px;
    color:@main;
    border:1px solid @main;
    border-radius:26px;

  }
}
</style>