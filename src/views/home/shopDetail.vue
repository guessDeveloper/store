<template>
  <div>
     <div class="brand-top-nav">
        <router-link tag="a" to="/">首页</router-link>
        <span class="iconfont iconjiantou"></span>
        <router-link tag="a" to="/shop">逛街购物</router-link>
        <span class="iconfont iconjiantou"></span>
        <span class="now-nav">{{detial.Mertchntname}}</span>
    </div>
    <div class="detail">
       <div class="detail-left">
         <img src="../../assets/img/video-default.png" alt="" class="img-port">
         <el-carousel trigger="click" height="100%" class="img-box" >
          <el-carousel-item v-for="item in bannerList" :key="item">
            <video :src="item" v-if="isMp4(item)" class="banner-video" ></video>
            <img :src="item" alt="" class="banner-img" v-else>
          </el-carousel-item>
        </el-carousel>
       </div>
       <div class="detail-right">
         <div class="goods-box">
            <img :src="detial.MertchntLogo" alt="" class="logo">
            <div class="des">
              <h2>{{detial.Mertchntname}}</h2>
              <p>国内知名</p>
            </div>
         </div>
         <div class="icon-box phone">
            <span class="name">联系方式：</span>{{detial.MertchntTel}}
         </div>
          <div class="icon-box adress">
            <span class="name">商家地址：</span><a @click="toMap = true"  class="pc">{{detial.Mertchntsite}}</a> <a :href="mapUrl" class="phone">{{detial.Mertchntsite}}</a>
         </div>
         <div class="icon-box">
            <span class="name">商家简介：</span>{{detial.MertchnStory}}
         </div>
         <div class="score-box">
           <div class="line">奖励比例：<span class="num red">{{detial.MertchntMaxFanli}}%</span></div>
           <div class="line">商家诚信积分：<span class="num blue">{{detial.MertchntReputationIntegral}}</span></div>
           <div class="line">商家剩余积分：<span class="num yellow">{{detial.MertchntResidueIntegral}}</span></div>
         </div>
       </div>
    </div>
    <div class="goods-about">
      <h3 class="title">
            相关商品 
            <!-- <span>100</span> -->
            <router-link  class="more" tag="a" :to="'/goodsList?id='+MerchanterId"> 查看全部<span class="iconfont iconjiantou"></span></router-link>
      </h3>
      <ul class="good-list">
             <li v-for="(item,index) in goodsList" :key="index"><goodCard :data="item"></goodCard></li>
        </ul>
    </div>
    <!-- <div class="comment-list-box">
      <h3 class="title">
              全部评价 <span>{{commentTotal}}</span><router-link  class="more" tag="a" :to="'/commentList?id='+MerchanterId+'&type=1'"> 查看全部<span class="iconfont iconjiantou"></span></router-link>
          </h3>

            <ul class="comment-list">
              <li v-for="(item,index) in commentList" :key="index">
                <commentCard :data="item"></commentCard>
              </li>

          </ul>
    </div> -->
    <el-dialog title="商家位置" :visible.sync="toMap" custom-class="custom-dialog">
       <shopMap  :defaultPoint="mapPorint"></shopMap>
    </el-dialog>
  </div>
</template>
<script>
import goodCard from '@/components/shop/shopGoodsCard'
import commentCard from '@/components/common/commentCard'
import shopMap from '@/components/shop/shopMap';
export default {
  data(){
    return{
      MerchanterId:'',
      commentList:[],
      goodsList:[],
      commentTotal:'',
      detial:'',
      bannerList:[],
      mapPorint:{},
      toMap:false
    }
  },
  mounted(){
    if(this.$route.query.id){
      this.MerchanterId = this.$route.query.id;
    }
    this.getDetail();
  },
  components:{
    goodCard:goodCard,
    commentCard:commentCard,
    shopMap:shopMap
  },
  computed:{
     mapUrl(){
      return `http://api.map.baidu.com/marker?location=${this.mapPorint.MertchntY},${this.mapPorint.MertchntX}&title=商家地址&content=${this.detial.Mertchntname}&output=html&src=webapp.baidu.openAPIdemo`
    },
  },
  methods:{
    //获取商家产品
    getDetail(){
      this.$http.post(this.$api.MerchantInfo,{
        MerchantId:this.MerchanterId,
        token:localStorage.getItem('token')?localStorage.getItem('token'):''
      }).then(res=>{
        if(res.data.Code == 1){
          console.log(res.data.Data)
          this.detial = res.data.Data.model
          this.commentList = res.data.Data.model.PinList
          this.goodsList = res.data.Data.model.GoodsList
          this.mapPorint = res.data.Data.model
          this.getBanner();
        }
      })
    },
    //获取商家banner
    getBanner(){
      this.bannerList = JSON.parse(this.detial.MertchntImge);

    },
    //判断是否是mp4
    isMp4(url){
      let reg = /.mp4/;
      return reg.test(url)
    }
  }
}
</script>
<style lang="less" scoped>
.detail{
  width: @max-width;
  height:320px;
  background:#fff;
  .clear();
  margin:0 auto;
  .detail-left{
    float: left;
    width:568px;
    height:320px;
    background:#ccc;
    .img-port{
      display: none;
    }
    .banner-img{
      width:100%;
    }
    .banner-video{
      width:100%;
      height:100%;
    }
  }
  .detail-right{
    position: relative;
    float:left;
    width:632px;
    padding:0 30px 0 30px;
    box-sizing: border-box;
    .goods-box{
      margin-top:30px;
      margin-bottom:21px;
      .clear();
      .logo{
        float:left;
        width:65px;
        height:65px;
        margin-right:17px;
      }
      .des{
        float: left;
        h2{
          font-size:20px;
          line-height: 18px;
          margin:11px 0 11px 0;
        }
        p{
          font-size:14px;
          line-height: 14px;
          color:@subtitle_color;
        }
      }
    }
    .score-box{
       position: absolute;
       top:41px;
       right:30px;
       text-align: left;
       font-size:12px;
       line-height: 12px;
       color:@subtitle_color;
       .line{
         margin-bottom:24px;
         .num{
           font-weight: bold;
         }
         .red{
           color:@percent_color;
         }
         .blue{
           color:@surplus;
         }
         .yellow{
           color:@main;
         }
       }
    }
    .phone{
      margin-bottom:16px;
    }
    .adress{
      margin-bottom:12px;
    }
    .icon-box{
      text-align: left;
      padding-left:20px;
      font-size:12px;
      line-height: 28px;
      .name{
        color:@subtitle_color;
      }
      a{
        color:@font_color;
        text-decoration: underline;
         &.phone{
          display:none;
        }
      }
    }

  }
}

//评论
.comment-list-box{
  width:@max-width;
  margin: 0px auto 100px;
  background:#fff;
  padding-bottom:60px;
  .title{
    padding:40px 30px 0;
    font-size:28px;
    text-align: left;
    line-height:24px;
    span{
      color:@comment_num_color;
    }
  }
  .more{
      float: right;
      font-size:12px;
      color:@font_color;
      font-weight: normal;
      .iconfont{
        font-size:10px;
        color:@font_color;
      }
    }
}
.comment-list{
  display:block;
  .clear();
  padding:0 5px;
  li{
    float: left;
    width:545px;
    margin:0 25px;
  }

}
//相关商品
.goods-about{
  width:@max-width;
  margin:20px auto;
  background:#fff;
  .title{
    padding:40px 30px 0;
    font-size:28px;
    text-align: left;
    line-height:24px;
    span{
      color:@main;
    }
    .more{
      float: right;
      font-size:12px;
      color:@font_color;
      font-weight: normal;
      .iconfont{
        font-size:10px;
        color:@font_color;
      }
    }
  }

}
.good-list{
  display: block;
  padding:27px 17px 17px 17px;
  .clear();
  li{
    float: left;
    width:265px;
    margin:13px;
  }
}
@media screen and(max-width:@change_width) {
  .detail {
    width: 100%;
    height: auto;
    .detail-left {
      float: none;
      width: 100%;
      height: auto;
      position: relative;
      .img-port{
        display: block;
        width:100%;
      }
      .img-box{
        position:absolute;
        top:0;
        width:100%;
        height:100%;
      }
      // height: 212px;
    }
    .detail-right {
      float: none;
      width: 100%;
      padding: 0 15px 20px;
      .goods-box {
        margin-bottom: 120px;
      }
      .icon-box {
        padding-left: 0;
        a{
          &.pc{
            display: none;
          }
          &.phone{
           display:inline-block;
          }
        }
      }
      .score-box {
        // position: static;
        // margin-top: 15px;
        left: 15px;
        right: auto;
        top: 85px;
      }
    }
  }
  .goods-about {
    width: 100%;
    margin: 10px auto 0;
    .title {
      padding: 15px 15px 15px 30px;
      border-bottom: 1px solid #F8F8F8;
      font-size:20px;
      position: relative;
    }
    .title:before {
      content: '';
      display: block;
      position: absolute;
      left: 15px;
      top: 50%;
      width: 4px;
      height: 30%;
      transform: translateY(-50%);
      background-color: #F38A1D;
    }
    .good-list {
        padding: 15px;
        overflow: hidden;
        li {
          margin: 0;
          float: left;
          width: 50%;
          box-sizing: border-box;
        }
        li:nth-child(odd) {
          padding-right: 8px;
        }
        li:nth-child(even) {
          padding-left: 8px;
        }
    }
  }
  .comment-list-box {
    width: 100%;
    margin-top: 10px;
    .title {
      padding: 15px 15px 15px 30px;
      font-size: 20px;
      position: relative;
      border-bottom: 1px solid #F8F8F8;
    }
    .title:before {
      content: '';
      display: block;
      position: absolute;
      left: 15px;
      top: 50%;
      width: 4px;
      height: 30%;
      transform: translateY(-50%);
      background-color: #F38A1D;
    }
  }
}
</style>
