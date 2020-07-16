<template>
  <div>

    <navBar></navBar>
    <navBottom></navBottom>
     <div class="brand-top-nav">
        <router-link tag="a" to="/store">商家中心</router-link>
        <span class="iconfont iconjiantou"></span>
        <a  href="javascript:history.go(-1)">商家产品</a>
        <span class="iconfont iconjiantou"></span>
        <span class="now-nav">{{detail.Name}}</span>
      </div>
    <div class="detail-box">
       <div class="banner">
         <el-carousel trigger="click" height="420px">
          <el-carousel-item v-for="item in detail.GoodInfoPic" :key="item">
            <!-- <img :src="item" alt="" class="banner-img" > -->
             <el-image :src="item" class="show-img" fit="contain">
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
          <div class="price"><span class="one">¥</span><span class="num">{{detail.price}}</span><span class="danwei">/份</span></div>
          <div class="score">积分约：{{detail.Integral}}/份</div>
          <div style="height:40px;">
          <el-input-number v-model="num" @change="handleChange" :min="1" :max="10" label="描述文字"></el-input-number>
          </div>
          <button  class="buy-btn" :disabled="true" ><i class="iconfont icongwc"></i>下单</button>
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
      </div> -->
   
    <footerBar></footerBar>
  </div>
</template>
<script>
import  navBar from '@/components/store/storeNav'
import  navBottom from'@/components/store/storeNavBar'
import footerBar from '@/components/common/footer'
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
       carModel:{
         ClikUrl: "https://testnet.youledui.com/kapai/#/earthDetail?ProductId=f53150df-d9b0-410e-b88b-c1c3af6975d1",
          GoodsId: "f53150df-d9b0-410e-b88b-c1c3af6975d1",
          GoodsImg: "https://files.youledui.comhttps://files.youledui.com/Uploadfiles/image/20200626/b4ed36da-62ea-42be-b95c-00c7992359fb.jpg",
          GoodsMoneny: "18.00",
          GoodsName: "干煸豆角",
          Goodsfanbi: "0.036",
          Goodsfanli: "64.800000",
          IsQRcode: 1,
          MertchntID: "713d2936-e759-4ae7-a488-16b9647afbe4",
          Mertchntname: "分米鸡1",
          checked: false,
          num: 1,
          tablenumber: "1",
       },
    }
  },
  components: {
    navBar:navBar,
    navBottom:navBottom,
    footerBar:footerBar,
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
       this.$http.post(this.$api.GetMerchanterGoodInfo,{
         ProductId:this.ProductId,
       }).then(res=>{
         if(res.data.Code == 1){
           this.allData = res.data.Data
           this.IsQRcode = res.data.Data.IsQRcode
           this.detail = res.data.Data.Model
           this.carModel.GoodsId = this.detail.Goodid;
           this.carModel.GoodsImg = this.detail.GoodImage;
           this.carModel.GoodsMoneny = this.detail.price;
           this.carModel.GoodsName = this.detail.Name;
           this.carModel.Goodsfanbi =this.detail.Integral;
           this.carModel.MertchntID = res.data.Data.MerchantId;
           this.carModel.tablenumber = res.data.Data.tablenumber
           this.carModel.ClikUrl = this.detail.ClickUrl
         }
       })
     },
     //加入购物车
     addCar(){
        this.carAddStore([{id:this.allData.MerchantId,name:this.allData.MerchantName,tablenumber:this.allData.tablenumber},{...this.carModel,num:1,checked:false}])
         this.$message.success('加入购物车成功')
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
  margin-bottom:20px;
  .clear();
  .banner{
    float:left;
    width:420px;
    height:420px;
    background:#fff;
    // img{
    //   width: 100%;
    //   height:100%;
    // }
    .show-img{
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
      float:none;
      width:100%;
    }
    .detail-des{
      margin:0;
      float: none;
      padding:0 15px;
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
