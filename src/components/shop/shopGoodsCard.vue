<template>
  <div class="card-box">
    <img :src="data.GoodsImg" alt="" @click="goDetail">
    <div class="des">
      <h4 @click="goDetail">{{data.GoodsName}}</h4>
      <!-- <p>{{data.GoodsTitle}}</p> -->
      <p>积分约：{{data.Goodsfanli}}</p>
      <div class="price">¥{{data.GoodsMoneny}}</div>
    </div>
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
  },
  methods:{
    goDetail(){
      this.$router.push(`/shopGoodsDetail?ProductId=${this.data.GoodsId}`)
    }
  }
}
</script>
<style lang="less" scoped>
.card-box{
  width:100%;
  text-align: center;
  img{
    display: block;
    width:100%;
    height:265px;
    cursor: pointer;
  }
  .des{
    padding:0 13px;
    height: 104px;
  }
  h4{
    font-size:14px;
    font-weight: normal;
    line-height: 15px;
    margin-top:20px;
    margin-bottom:12px;
    .overTextOne();
    cursor: pointer;
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
@media screen and(max-width:@change_width){
  .card-box{
    img{
      height:auto;
    }
  }
  h4{
    font-size:12/@p;
    line-height: 12/@p;
    margin-bottom:7px;
  }
  p{
    font-size:10/@p;
    line-height: 10/@p;
  }
  .price{
    margin-top:7/@p;
  }
  .des{
    padding:0 7/@p;
  }
}
</style>