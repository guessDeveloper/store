<template>
  <a class="card-box" :href="data.ClickURL" target="_blanck">
    <div class="img-box">
      <img src="../../assets/img/1-1.jpg" alt="" class="hidden-img">
      <!-- <img :src="data.picurl" alt=""  class="show-img"> -->
      <el-image :src="data.picurl" lazy class="show-img" fit="contain">
        <div slot="placeholder" class="image-slot">
          加载中<span class="dot">...</span>
        </div>
      </el-image>
    </div>

    <div class="des">
      <h4>{{data.titleA}}</h4>
      <div class="store">{{data.MerchantName}}</div>
      <p>{{data.tieleB}}</p>
      <div class="price">¥{{data.price}}</div>
    </div>
  </a>
</template>
<script>
export default {
  data() {
    return {

    }
  },
  props: {
    data: {
      type: Object
    }
  },
  methods: {
    // goDetail(){
    //   this.$router.push(`/productDetail?GoodType=1&GoodID=${this.data.ID}`)
    // }
  }
}
</script>
<style lang="less" scoped>
.card-box {
  width: 100%;
  color: @font_color;
  text-align: center;
  .img-box {
    position: relative;
    overflow: hidden;
    width: 100%;
    .hidden-img {
      width: 100%;
      opacity: 0;
    }
    .show-img {
      position: absolute;
      left: 0;
      top: 50%;
      transform: translateY(-50%);
      width: 100%;
      height: 100%;
    }
  }
  img {
    display: block;
    width: 100%;
    height: 265px;
  }
  .des {
    padding: 0 13px;
    height: 104px;
  }
  h4 {
    font-size: 14px;
    font-weight: normal;
    line-height: 15px;
    margin-top: 20px;
    margin-bottom: 7px;
    .overTextOne();
  }
  p {
    font-size: 12px;
    color: @subtitle_color;
    line-height: 26px;
  }
  .store {
    font-size: 14px;
    color: #4a90e2;
    line-height: 28px;
    .overTextOne();
  }
  .price {
    font-size: 16px;
    line-height: 16px;
    margin-top: 5px;
    font-weight: bold;
    color: @percent_color;
  }
}
@media screen and(max-width:@change_width) {
  .card-box {
    img {
      height: auto;
    }
    .des {
      padding: 0 7 / @p;
      height: 120 / @p;
    }
    h4 {
      font-size: 12 / @p;
      line-height: 24 / @p;
      margin-bottom: 0;
    }
    p {
      font-size: 10 / @p;
      line-height: 20 / @p;
    }
    .store {
      font-size: 12 / @p;
      line-height: 24 / @p;
    }
    .price {
      margin-top: 0;
      line-height: 24 / @p;
    }
  }
}
</style>