<template>
  <div>
    <div class="brand-top-nav">
      <router-link tag="a" to="/">首页</router-link>
      <span class="iconfont iconjiantou"></span>
      <router-link tag="a" to="/food">美食广场</router-link>
      <span class="iconfont iconjiantou"></span>
      <span class="now-nav">{{detial.Mertchntname}}</span>
    </div>
    <div class="detail">
      <div class="detail-left">
        <img src="../../assets/img/video-default.png" alt="" class="img-port">
        <el-carousel trigger="click" height="100%" class="img-box" :autoplay="autoplay" @change="videoPause">
          <el-carousel-item v-for="item in bannerList" :key="item">
            <div class="banner-video" v-if="isMp4(item)">
              <video :src="item" controls class="video"></video>
            </div>
            <el-image :src="item" class="banner-img" fit="contain" v-else>
              <!-- <div slot="placeholder" class="image-slot">
                    加载中<span class="dot">...</span>
                  </div> -->
            </el-image>
            <!-- <img :src="item" alt="" class="banner-img" v-else> -->
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
        <div class="score-box">
          <div class="line">奖励比例：<span class="num red">{{detial.MertchntMaxFanli}}%</span></div>
          <div class="line">商家诚信积分：<span class="num blue">{{detial.MertchntReputationIntegral}}</span></div>
          <div class="line">商家剩余积分：<span class="num yellow">{{detial.MertchntResidueIntegral}}</span></div>
        </div>
        <div class="icon-box phone">
          <span class="name">联系方式：</span>{{detial.MertchntTel}}
        </div>
        <div class="icon-box adress">
          <span class="name">商家地址：</span><a @click="toMap = true" class="pc">{{detial.Mertchntsite}}</a> <a :href="mapUrl">{{detial.Mertchntsite}}</a>
        </div>
        <div class="icon-box">
          <span class="name">商家简介：</span>{{detial.MertchnStory}}
        </div>

      </div>
    </div>
    <div class="goods-about">
      <h3 class="title">
        全部商品
        <router-link class="more" tag="a" :to="'/foodList?id='+MerchanterId"> 查看全部<span class="iconfont iconjiantou"></span></router-link>
      </h3>
      <div class="good-class-list">
        <div class="item" :class="{active:nowClass == ''}" @click="getGoodsByClass('')">全部</div>
        <div class="item" v-for="(item,index) in classList" :key="index" :class="{active:nowClass == item.Id}" @click="getGoodsByClass(item.Id)">{{item.CategoryName}}</div>
      </div>
      <ul class="good-list">
        <li v-for="(item,index) in goodsList" :key="index">
          <goodCard :data="item"></goodCard>
        </li>
      </ul>
    </div>
    <div class="comment-list-box">
      <h3 class="title">
        全部评价 <span>{{commentTotal}}</span>
        <router-link class="more" tag="a" :to="'/commentList?id='+MerchanterId+'&type=2'"> 查看全部<span class="iconfont iconjiantou"></span></router-link>
      </h3>

      <ul class="comment-list">
        <li v-for="(item,index) in commentList" :key="index">
          <commentCard :data="item"></commentCard>
        </li>

      </ul>
    </div>
    <el-dialog title="商家位置" :visible.sync="toMap" custom-class="custom-dialog">
      <shopMap :defaultPoint="mapPorint"></shopMap>
    </el-dialog>
  </div>
</template>
<script>
import goodCard from '@/components/food/foodListCard'
import commentCard from '@/components/common/commentCard'
import shopMap from '@/components/shop/shopMap';
export default {
  data() {
    return {
      MerchanterId: '',
      commentList: [],
      goodsList: [],
      commentTotal: '',
      detial: '',
      bannerList: [],
      IsQRcode: 0,
      tablenumber: '',
      mapPorint: {},
      toMap: false,
      autoplay: true,
      classList: [],
      nowClass: '',
    }
  },
  mounted() {
    let _this = this;
    if (this.$route.query.id) {
      this.MerchanterId = this.$route.query.id;
    }
    this.getClass();
    this.getDetail();
    window.videoPlay = function () {
      _this.autoplay = false
    }
    window.videoPasue = function () {
      _this.autoplay = true
    }
  },
  computed: {
    mapUrl() {
      return `http://api.map.baidu.com/marker?location=${this.mapPorint.MertchntY},${this.mapPorint.MertchntX}&title=商家地址&content=${this.detial.Mertchntname}&output=html&src=webapp.baidu.openAPIdemo`
    },
  },
  components: {
    goodCard: goodCard,
    commentCard: commentCard,
    shopMap: shopMap
  },
  methods: {
    videoPause() {
      var elevideo = document.querySelectorAll(".video");
      elevideo.forEach(element => {
        element.pause()
      })
    },
    //获取商家产品
    getDetail() {
      let _this = this;
      this.$http.post(this.$api.MerchantInfo, {
        ProductCategoryId: this.nowClass,
        MerchantId: this.MerchanterId
      }).then(res => {
        if (res.data.Code == 1) {
          this.IsQRcode = res.data.Data.IsQRcode
          this.tablenumber = res.data.Data.tablenumber
          this.detial = res.data.Data.model
          this.commentList = res.data.Data.model.PinList
          let arry = res.data.Data.model.GoodsList;
          this.mapPorint = res.data.Data.model
          arry.forEach(element => {
            element.IsQRcode = _this.IsQRcode
            element.tablenumber = _this.tablenumber
            element.Mertchntname = this.detial.Mertchntname
            element.MertchntID = this.detial.MertchntID
          });
          this.goodsList = arry
          this.getBanner();
        }
      })
    },
    //获取商家banner
    getBanner() {
      let _this = this;
      this.bannerList = JSON.parse(this.detial.MertchntImge);
      this.$nextTick(() => {
        var elevideo = document.querySelectorAll(".video");
        elevideo.forEach(element => {
          element.addEventListener('playing', window.videoPlay, false);
        })

      })

    },

    //判断是否是mp4
    isMp4(url) {
      let reg = /.mp4/;
      return reg.test(url)
    },
    //获取产品分类
    getClass() {
      this.$http.post(this.$api.GetMerchantProductClass, {
        MerchantId: this.MerchanterId
      }).then(res => {
        if (res.data.Code == 1) {
          this.classList = res.data.Data.List
        }
      })
    },
    //根据分类查找
    getGoodsByClass(ID) {
      this.nowClass = ID;
      this.$http.post(this.$api.MerchantInfo, {
        ProductCategoryId: this.nowClass,
        MerchantId: this.MerchanterId
      }).then(res => {
        if (res.data.Code == 1) {
          let _this = this;
          // this.IsQRcode = res.data.Data.IsQRcode
          // this.tablenumber = res.data.Data.tablenumber
          // this.detial = res.data.Data.model
          // this.commentList = res.data.Data.model.PinList
          let arry = res.data.Data.model.GoodsList;
          // this.mapPorint = res.data.Data.model
          arry.forEach(element => {
            element.IsQRcode = _this.IsQRcode
            element.tablenumber = _this.tablenumber
            element.Mertchntname = this.detial.Mertchntname
            element.MertchntID = this.detial.MertchntID
          });
          this.goodsList = arry
          // this.getBanner();
        }
      })
    }
  }
}
</script>
<style lang="less" scoped>
.detail {
  width: @max-width;
  height: 320px;
  background: #fff;
  .clear();
  margin: 0 auto;
  .detail-left {
    float: left;
    width: 568px;
    height: 100%;
    background: #000;
    img {
      width: 100%;
      height: 100%;
      // margin-left: 50%;
      // transform: translateX(-50%);
    }
    .img-port {
      display: none;
    }
    .banner-img {
      width: 100%;
      height: 100%;
    }
    .banner-video {
      width: 100%;
      height: 100%;
      background: #000;
      video {
        width: 100%;
        height: 100%;
      }
    }
  }
  .detail-right {
    position: relative;
    float: left;
    width: 632px;
    padding: 0 30px 0 30px;
    box-sizing: border-box;
    .goods-box {
      margin-top: 30px;
      margin-bottom: 21px;
      .clear();
      .logo {
        float: left;
        width: 65px;
        height: 65px;
        margin-right: 17px;
      }
      .des {
        float: left;
        h2 {
          font-size: 20px;
          line-height: 18px;
          margin: 11px 0 11px 0;
        }
        p {
          font-size: 14px;
          line-height: 14px;
          color: @subtitle_color;
        }
      }
    }
    .score-box {
      position: absolute;
      top: 41px;
      right: 30px;
      text-align: left;
      font-size: 12px;
      line-height: 12px;
      color: @subtitle_color;
      .line {
        margin-bottom: 24px;
        .num {
          font-weight: bold;
        }
        .red {
          color: @percent_color;
        }
        .blue {
          color: @surplus;
        }
        .yellow {
          color: @main;
        }
      }
    }
    .phone {
      margin-bottom: 16px;
    }
    .adress {
      margin-bottom: 12px;
    }
    .icon-box {
      text-align: left;
      padding-left: 20px;
      font-size: 12px;
      line-height: 28px;
      word-break: break-all;
      .name {
        color: @subtitle_color;
      }
      a {
        color: @font_color;
        text-decoration: underline;
        &.phone {
          display: none;
        }
      }
    }
  }
  @media screen and(max-width:@change_width) {
    width: 100%;
    height: auto;
    overflow: hidden;
    .detail-left {
      float: none;
      width: 100%;
      background: #000;
      position: relative;
      height: auto;
      .img-port {
        display: block;
        width: 100%;
        opacity: 0;
      }

      .img-box {
        position: absolute;
        top: 0;
        width: 100%;
        height: 100%;
      }
    }
    .detail-right {
      width: 100%;
      padding: 0 15px 30px;
      .des {
        width: calc(100% - 83px);
      }
      .goods-box {
        margin-top: 20px;
        margin-bottom: 20px;
      }
      .score-box {
        position: static;
      }
      .icon-box {
        padding-left: 0;
        a {
          &.pc {
            display: none;
          }
          &.phone {
            display: inline-block;
          }
        }
      }
    }
  }
}

//评论
.comment-list-box {
  width: @max-width;
  margin: 0px auto 100px;
  background: #fff;
  padding-bottom: 60px;
  .title {
    padding: 40px 30px 0;
    font-size: 22px;
    text-align: left;
    line-height: 24px;
    span {
      color: @comment_num_color;
    }
    .more {
      float: right;
      font-size: 12px;
      color: @font_color;
      font-weight: normal;
      .iconfont {
        font-size: 10px;
        color: @font_color;
      }
    }
  }
  @media screen and(max-width:@change_width) {
    width: 100%;
    margin: 10px auto 100px;
    .title {
      position: relative;
      padding: 0 15px 0 30px;
      font-size: 20px;
      line-height: 58px;
      border-bottom: 1px solid @class_border;
      &:before {
        content: "";
        display: block;
        position: absolute;
        left: 15px;
        top: 20px;
        width: 4px;
        height: 18px;
        background: @main;
      }
    }
  }
}
.comment-list {
  display: block;
  .clear();
  padding: 0 5px;
  li {
    float: left;
    width: 545px;
    margin: 0 25px;
  }
  @media screen and(max-width:@change_width) {
    li {
      float: none;
      width: auto;
      margin: 0 10px;
    }
  }
}
//相关商品
.goods-about {
  width: @max-width;
  margin: 20px auto;
  background: #fff;
  .title {
    padding: 40px 30px 0;
    font-size: 22px;
    text-align: left;
    line-height: 24px;
    span {
      color: @main;
    }
    .more {
      float: right;
      font-size: 12px;
      color: @font_color;
      font-weight: normal;
      .iconfont {
        font-size: 10px;
        color: @font_color;
      }
    }
  }
  @media screen and(max-width:@change_width) {
    width: 100%;
    margin: 10px auto;
    .title {
      position: relative;
      padding: 0 15px 0 30px;
      font-size: 20px;
      line-height: 58px;
      border-bottom: 1px solid @class_border;
      &:before {
        content: "";
        display: block;
        position: absolute;
        left: 15px;
        top: 20px;
        width: 4px;
        height: 18px;
        background: @main;
      }
    }
  }
}
.good-list {
  display: block;
  padding: 27px 17px 17px 17px;
  .clear();
  li {
    float: left;
    width: 265px;
    margin: 13px;
  }
  @media screen and(max-width:@change_width) {
    padding: 10px 0 0 15px;
    li {
      width: calc(50% - 15px);
      margin: 0 15px 15px 0;
    }
  }
}
.good-class-list {
  overflow: hidden;
  margin: 30px 15px 0;
  .item {
    float: left;
    font-size: 14px;
    margin: 0 15px;
    cursor: pointer;
    &.active {
      color: @main;
    }
  }
  @media screen and(max-width:@change_width) {
    display: -webkit-box;
    margin: 0 15 / @p;
    line-height: 45 / @p;
    overflow: scroll;
    &::-webkit-scrollbar {
      display: none;
    }
    .item {
      float: none;
      margin: 0 10 / @p 0 0;
      font-size: 12 / @p;
      color: @font_color;
      &.active {
        position: relative;
        &:after {
          content: "";
          position: absolute;
          left: 0;
          right: 0;
          margin: 0 auto;
          bottom: 0;
          width: 12 / @p;
          height: 2 / @p;
          background: @main;
        }
      }
    }
  }
}
</style>