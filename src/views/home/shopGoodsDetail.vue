<template>
  <div>
     <div class="brand-top-nav">
        <router-link tag="a" to="/">首页</router-link>
        <span class="iconfont iconjiantou"></span>
        <span class="now-nav">逛街购物</span>
    </div>
    <div class="detail-box">
       <div class="banner">
         <img src="../../assets/img/1-1.jpg" alt="" class="hide-img">
         <el-carousel trigger="click" height="100%" class="show-img">
          <el-carousel-item v-for="item in detail.GoodInfoPic" :key="item">
           <el-image :src="item" class="banner-img" fit="contain">
                <div slot="placeholder" class="image-slot">
                  加载中<span class="dot">...</span>
                </div>
             </el-image>
          </el-carousel-item>
         </el-carousel>
       </div>
       <div class="detail-des">
          <h2>{{detail.Name}}</h2>
          <p>{{detail.Describe}}</p>
          <div class="price"><span class="one">¥</span><span class="num">{{detail.price}}</span><span class="danwei"></span></div>
          <div class="score">积分约：{{detail.Integral}}</div>
       
         
       </div>
    </div>
    <!-- <div class="store-des">
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
    </div> -->
  </div>
</template>
<script>
import '@/plugins/element-inputNum.js'
import { mapState, mapMutations} from 'vuex' //注册 action 和 state
export default {
  data(){
    return{
       num: 1,
       ProductId:'',
       detail:'',
       IsQRcode:'',
       allData:'',
    }
  },
  computed:{
     ...mapState([
       'positionX',
       'isLogin',
       'myCar'
     ])
  },
  mounted(){
    this.$route.query.ProductId?this.ProductId = this.$route.query.ProductId:''
    this.getDetail();
  },
  methods:{
    ...mapMutations([
      'addNum',
      'setLogin',
      'carAddStore'
     ]),
     handleChange(value) {
        console.log(value);
      },
     getDetail(){
       this.$http.post(this.$api.shopGetMerchanterGoodInfo,{
         ProductId:this.ProductId,
       }).then(res=>{
         if(res.data.Code == 1){
           this.allData = res.data.Data
           this.IsQRcode = res.data.Data.IsQRcode
           this.detail = res.data.Data.Model
         }
       })
     },
     //加入购物车
     addCar(){
        this.carAddStore([{id:this.allData.MerchantId,name:this.allData.MerchantName,tablenumber:this.allData.tablenumber},{...this.detail,num:1,checked:false}])
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
    background:#fff;
    .hide-img{
      display: none;
    }
    .banner-img{
      width:100%;
      height:100%;
    }
   
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
    &:disabled{
      background:@subtitle_color;
    }
    .iconfont{
      color:#fff;
      font-size: 20px;
      margin-right:8px;
    }
  }
  @media screen and(max-width:@change_width){
    width:100%;
    padding:0;
    .banner{
      position: relative;
      float:none;
      width:100%;
      height: auto;
      .hide-img{
        display: block;
        width:100%;
        opacity: 0;
      }
      .show-img{
        position: absolute;
        top:0;
        left: 0;
        width:100%;
      }
    }
    .detail-des{
      margin:0;
      float: none;
      padding:0 15px 15px;
      width: 100%;
      box-sizing: border-box;
      .buy-btn {
        width: 100%;
        margin-bottom: 20px;
      }
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
  @media screen and(max-width:@change_width){
    width: 100%;
    .des-box {
      .des {
        .item {
          float: none;
        }
      }
    }
  }
}
</style>
