<template>
  <div class="subject-card">
      <img src="../../assets/img/fuzhuang.png" alt="">
      <div class="des">
         <h4>女式坑条冰纱短袖针织衫 <span class="price">249元起</span></h4>
         <p>餐厨起居洗护好物</p>
         <div class="num-box"><span class="zan num"><i class="iconfont iconxh"></i>39948</span><span class="num"><i class="iconfont iconck"></i>3434322</span><span class="num comment"><i class="iconfont iconpl"></i>fsdfsdf </span></div>
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
.subject-card{
  width:100%;
   background:#fff;
   text-align: left;
  img{
    display: block;
    width:380px;
    height:380px; 
  }
  .des{
    padding:25px 20px 27px;
    h4{
      font-size:16px;
      text-align: left;
      line-height: 16px;
      font-weight: normal;
      .price{
        font-size:16px;
        float:right;
        font-weight:bold;
        color:@percent_color;
      }
    }
    p{
      
      font-size:12px;
      line-height: 12px;
      margin-top:8px;
      color:@subtitle_color;
    }
  }
  .num-box{
    margin-top:32px;
    .clear();
    .comment{
      float:right;

    }
    .zan{
      display: inline-block;
      width:85px;
    }
  }
  .num{
    font-size:14px;
    .iconfont{
      font-size:14px;
      color:@placeholder_color;
      margin-right:6px;
    }
  }
}
</style>