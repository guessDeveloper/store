<template>
  <div>
     <div class="brand-top-nav">
        <router-link tag="a" to="/">首页</router-link>
        <span class="iconfont iconjiantou"></span>
        <span class="now-nav">逛街购物</span>
    </div>
    <div class="detail-box">
       <div class="banner"></div>
       <div class="detail-des">
          <h2>姚记羊蝎子（回龙观店）</h2>
          <p>羊蝎子（Lamb Spine Hot Pot），是一道鲁菜，主材是带里脊肉和脊髓的完整羊脊椎骨，因其形跟蝎子相似，故而俗称羊蝎子。羊蝎子低脂肪、低胆固醇、高蛋白，富含钙质。易于吸收，有滋阴补肾，美颜壮阳…</p>
          <div class="price"><span class="one">¥</span><span class="num">15</span><span class="danwei">/串</span></div>
          <div class="score">积分约：50</div>
          <div style="height:40px;">
          <el-input-number v-model="num" @change="handleChange" :min="1" :max="10" label="描述文字"></el-input-number>
          </div>
          <button  class="buy-btn"><i class="iconfont icongwc"></i>加入购物车</button>
       </div>
    </div>
    <div class="store-des">
      <div class="persion-title">
          商品详情
      </div>
      <div class="des-box">
         <div class="des">
            <div class="item">衣长：常规</div>
             <div class="item">衣长：常规</div>
              <div class="item">衣长：常规</div>
               <div class="item">衣长：常规</div>
                <div class="item">衣长：常规</div>
                 <div class="item">衣长：常规</div>
         </div>
         <div class="img-box">
            <img src="" alt="">
         </div>
      </div>
    </div>
  </div>
</template>
<script>
import '@/plugins/element-inputNum.js'
export default {
  data(){
    return{
       num: 1
    }
  },
  methods:{
     handleChange(value) {
        console.log(value);
      }
  }
}
</script>
<style lang="less" scoped>
.detail-box{
  box-sizing: border-box;
  width:@max-width;
  margin:0 auto;
  background:#fff;
  padding:30px;
  .clear();
  .banner{
    float:left;
    width:420px;
    height:420px;
    background:#ccc;
  }
  .detail-des{
    float:left;
    width:680px;
    margin-left:40px;
    h2{
      font-size:26px;
      line-height: 26px;
      margin-top:40px;
    }
    p{
      font-size:14px;
      margin-top:16px;
      color:@subtitle_color;
      line-height: 22px;
    }
    .price{
      color:@percent_color;
      margin-top:20px;
      .one{
        font-size:24px;
        font-weight: bold;
      }
      .num{
        font-size:32px;
        font-weight: bold;
      }
      .danwei{
        font-size: 14px;
        color:@subtitle_color;
      }
    }
    .score{
      font-size:14px;
      color:@subtitle_color;
      line-height: 14px;
      margin-top:25px;
      margin-bottom:30px;
    }
  }
  .buy-btn{
    width:200px;
    height: 50px;
    border:0;
    margin-top:40px;
    background:@main;
    font-size:18px;
    color:#fff;
    .iconfont{
      color:#fff;
      font-size: 20px;
      margin-right:8px;
    }
  }
}
//介绍
.store-des{
  width:@max-width;
  background:#fff;
  margin:20px auto 100px;
  .des-box{
    padding:0 30px;
    .des{
      font-size:12px;
      color:@persion_left;
      line-height: 22px;
      padding:20px 0;
      .clear();
      .item{
        float: left;
        width:33.33%;
      }
      border-bottom:1px solid @class_border;
    }
  }
  .img-box{
    padding:30px 0;
    img{
      display:block;
      width:100%;
    }
  }
}
</style>