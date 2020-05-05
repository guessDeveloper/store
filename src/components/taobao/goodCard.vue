<template>
  <div class="card-box">
    <img src="../../assets/img/brand.png" alt="">
    <div class="des">
      <h4>经典黑白撞色，女式小香风纯羊毛开衫 积分</h4>
      <p>积分约：50</p>
      <div class="price">¥249</div>
    </div>
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
@import '../../assets/less/common.less';
.card-box{
  width:100%;
  img{
    display: block;
    width:100%;
    height:265px;
  }
  .des{
    padding:0 13px;
    height: 104px;
  }
  h4{
    font-size:14px;
    font-weight: normal;
    line-height: 14px;
    margin-top:20px;
    margin-bottom:12px;
    .overTextOne()
  }
  p{
    font-size:12px;
    color:@subtitle_color;
    line-height: 12px;
  }
  .price{
    font-size:16px;
    line-height: 16px;
    margin-top:12px;
    font-weight: bold;
    color:@percent_color;
  }
}
</style>