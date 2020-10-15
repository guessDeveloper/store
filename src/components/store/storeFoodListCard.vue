<template>
  <div class="item">
    <!-- <img :src="data.GoodsImg" alt="" @click="goDetail"> -->
    <div class="img-box">
      <img src="../../assets/img/1-1.jpg" alt="" class="hide-img">
      <el-image :src="data.GoodsImg" class="show-img" fit="contain" @click="goDetail">
        <!-- <div slot="placeholder" class="image-slot">
                    加载中<span class="dot">...</span>
                  </div> -->
      </el-image>
    </div>
    <h4 @click="goDetail">{{data.GoodsName}}</h4>
    <p @click="goDetail">预估积分：{{data.Goodsfanli}}</p>
    <div class="price" @click="goDetail">¥{{data.GoodsMoneny}}</div>
    <!-- <button class="add" @click="addCar" v-if="isLogin&&data.IsQRcode==1&&data.tablenumber">下单</button> -->
  </div>
</template>
<script>
import { mapState, mapMutations } from 'vuex' //注册 action 和 state
export default {
  data() {
    return {

    }
  },
  computed: {
    ...mapState([
      'positionX',
      'isLogin',
      'myCar'
    ])
  },
  props: {
    data: {
      type: Object
    }
  },
  mounted() {
    console.log(this.myCar)
  },
  methods: {
    ...mapMutations([
      'addNum',
      'setLogin',
      'carAddStore'
    ]),
    goDetail() {
      this.$router.push(`/storeEarthDetail?ProductId=${this.data.GoodsId}`)
    },
    //添加购物车
    addCar() {
      this.carAddStore([{ id: this.data.MertchntID, name: this.data.Mertchntname, tablenumber: this.data.tablenumber }, { ...this.data, num: 1, checked: false }])
      this.$message.success('加入美食订单成功')
    }
  }
}
</script>
<style lang="less" scoped>
.item {
  width: 100%;
  text-align: center;
  padding-bottom: 50px;
  // img{
  //   display:block;
  //   width:265px;
  //   height:265px;
  //   margin:0 auto 20px;
  // }
  .img-box {
    display: block;
    width: 265px;
    height: 265px;
    margin: 0 auto 20px;
    .hide-img {
      display: none;
    }
    .show-img {
      width: 100%;
      height: 100%;
    }
  }
  h4 {
    font-size: 14px;
    line-height: 14px;
  }
  p {
    font-size: 12px;
    color: @subtitle_color;
    line-height: 12px;
    margin-top: 12px;
  }
  .price {
    font-size: 16px;
    font-weight: bold;
    color: @percent_color;
    line-height: 12px;
    margin-top: 12px;
  }
  .add {
    width: 100px;
    height: 26px;
    margin-top: 15px;
    font-size: 12px;
    color: @main;
    border: 1px solid @main;
    border-radius: 26px;
  }
  @media screen and(max-width:@change_width) {
    padding-bottom: 15px;
    .img-box {
      position: relative;
      width: 100%;
      height: auto;
      .hide-img {
        display: block;
        width: 100%;
        opacity: 0;
      }
      .show-img {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
      }
    }
  }
}
</style>