<template>
  <a class="card-box" :href="data.ClickUrl" >
    <div class="img-box">
       <img src="../../assets/img/1-1.jpg" alt="" class="hidden-img">
       <img :src="data.picurl" alt=""  class="show-img">
    </div>
    <div class="des">
      <h4>{{data.titleA}}</h4>
      <p>{{data.titleB}}</p>
      <div class="price">¥{{data.price}}</div>
    </div>
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
  },
  methods:{
    // goDetail(){
    //   this.$router.push(`/productDetail?GoodType=1&GoodID=${this.data.ID}`)
    // }
  }
}
</script>
<style lang="less" scoped>
.card-box{
  width:100%;
  color:@font_color;
  text-align: center;
  .img-box{
    position: relative;
    overflow: hidden;
    width:100%;
    .hidden-img{
      width:100%;
      opacity: 0;
    }
    .show-img{
      position: absolute;
      left:0;
      top:50%;
      transform: translateY(-50%);
      width:100%;
      height: auto;
    }
  }
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
    line-height: 15px;
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