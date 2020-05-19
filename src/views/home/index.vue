<template>
  <div class="home tc">
    <div class="banner">
      <div class="banner-left">
         <classify></classify>
      </div>
      <div class="banner-right">
        <bannerBar></bannerBar>
      </div>
    </div>
    <!-- 分类 -->
    <div class="home-class-box">
       <phoneClass></phoneClass>
    </div>
    <!-- 商家联盟 -->
    <div class="section-box">
       <div class="title-box">
          <h2 class="title">商家联盟</h2>
          <span class="sub-title">积分直返消费者</span>
          <a class="more"> 查看全部 <span class="iconfont iconjiantou"></span></a>
          <div class="position-box">
          <el-dropdown trigger="click">
            <span class="el-dropdown-link box">
              <span class="iconfont iconweizhixuanze"></span> 北京 <span class="icon-arrow-down"></span>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item >黄金糕</el-dropdown-item>
              <el-dropdown-item >狮子头</el-dropdown-item>
              <el-dropdown-item >螺蛳粉</el-dropdown-item>
              <el-dropdown-item>双皮奶</el-dropdown-item>
              <el-dropdown-item >蚵仔煎</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          </div>
       </div>
       <div class="class-box">
          <div class="store-box">
              <div class="store-name">
                天津包子铺
              </div>
              <div class="store-percent">
                返比：<span>20%</span>
              </div>
              <img src="../../assets/img/brand.png" alt="">
          </div>
          <div class="store-box">
              <div class="store-name">
                天津包子铺
              </div>
              <div class="store-percent">
                返比：<span>20%</span>
              </div>
               <img src="../../assets/img/brand.png" alt="">
          </div>
          <div class="store-box">
              <div class="store-name">
                天津包子铺
              </div>
              <div class="store-percent">
                返比：<span>20%</span>
              </div>
              <img src="../../assets/img/brand.png" alt="">
          </div>
          <div class="store-box">
              <div class="store-name">
                天津包子铺
              </div>
              <div class="store-percent">
                返比：<span>20%</span>
              </div>
               <img src="../../assets/img/brand.png" alt="">
          </div>
       </div>
    </div>
    <!-- 推荐专区 -->
    <div class="section-box"> 
       <div class="title-box">
          <h2 class="title">推荐专区</h2>
       </div>
       <div class="class-box">
          <div class="recomend-box">
              <div class="recomend-title">特惠推荐</div>
              <div class="tip">我猜得到 你的需要</div>
              <img src="../../assets/img/rec.png" alt="">
          </div>
           <div class="recomend-box">
              <div class="recomend-title">特惠推荐</div>
              <div class="tip">我猜得到 你的需要</div>
              <img src="../../assets/img/rec.png" alt="">
          </div>
           <div class="recomend-box">
              <div class="recomend-title">特惠推荐</div>
              <div class="tip">我猜得到 你的需要</div>
              <img src="../../assets/img/rec.png" alt="">
          </div>
           <div class="recomend-box">
              <div class="recomend-title">特惠推荐</div>
              <div class="tip">我猜得到 你的需要</div>
              <img src="../../assets/img/rec.png" alt="">
          </div>
       </div>
    </div>
    <!-- 新鲜好物 -->
    <div class="section-box">
      <div class="title-box">
          <h2 class="title">新鲜好物</h2>
          <span class="sub-title">为你寻觅世间好物</span>
       </div>
       <div class="class-box goods-class-box">
         <div class="goods-big-box">
         <div class="goods">
          <div class="goods-box">
              <img src="../../assets/img/good.png" alt="">
              <h3 class="">芒果新鲜水果 热带水果</h3>
              <p>匠心剪裁，垂感质地</p>
              <div class="price">¥249</div>
          </div>
          <div class="goods-box">
              <img src="../../assets/img/good.png" alt="">
              <h3 class="">芒果新鲜水果 热带水果</h3>
              <p>匠心剪裁，垂感质地</p>
              <div class="price">¥249</div>
          </div>
          <div class="goods-box">
              <img src="../../assets/img/good.png" alt="">
              <h3 class="">芒果新鲜水果 热带水果</h3>
              <p>匠心剪裁，垂感质地</p>
              <div class="price">¥249</div>
          </div>
          <div class="goods-box">
              <img src="../../assets/img/good.png" alt="">
              <h3 class="">芒果新鲜水果 热带水果</h3>
              <p>匠心剪裁，垂感质地</p>
              <div class="price">¥249</div>
          </div>
          </div>
          </div>
       </div>
    </div>
    <div class="class-nav">
      <div class="class-nav-scroll-box">
        <div class="class-nav-scroll" :style="'width:'+classNav.length*80+'px;'">
          <a v-for="(item,index) in classNav" :key="index" :class="{active:item.active == 1}">{{item.title}}</a>
        </div>
      </div>
    </div>
    <!-- 服装 -->
    <div class="class-item" v-for="(item2,index2) in classNav" :key="index2" :class="{active:item2.active == 1}">
       <classPart :config='item2'></classPart>
    </div>
    <div class="footer-margin"></div>
  </div>
</template>

<script>
import phoneClass from '@/components/index/phone-class'
import classify from '@/components/index/banner-left'
import bannerBar from '@/components/index/banner'
import classPart from '@/components/index/section-part'

export default {
  name: "index",
  data(){
    return{
      classActive:1,
      classNav:[{
        title:'服装',
        active:1,
        type:1
      },{
        title:'厨具',
        active:0,
        type:2
      },{
        title:'配件',
        active:0,
        type:3
      },{
        title:'家居',
        active:0,
        type:4
      },]
    }
  },
  mounted(){
     this.getBanner();
  },
  methods:{
    getBanner(){
        this.$http.get(this.$api.GetBannerGoods).then()
     }
  },
  components: {
    classify:classify,
    bannerBar:bannerBar,
    classPart:classPart,
    phoneClass:phoneClass,
  }
}
</script>
<style lang="less" scoped>

.banner{
  width:@max-width;
  margin:20px auto 0;
  .clear();
  .banner-left{
    float: left;
    width:260px;
    height: 340px;
  }
  .banner-right{
    float:right;
    width:920px;
    height:340px;
    background:#fff;
  }
 
}
.home-class-box{
  display: none;
  width:100%;
  height:200px;
  background:#fff;
}
 @media screen and(max-width:@change_width) {
    .banner{
      box-sizing: border-box;
      width:100%;
      background:#fff;
      margin-top:0;
      padding:16px 15px 20px;
      .banner-left{
        display: none;
      }
      .banner-right{
        float:none;
        width:auto;
        height:auto;
      }
    } 
    .home-class-box{
      display: block;
      margin-top:10px;
    }
 }
.section-box{
    width:@max-width;
    margin:0 auto;
    background:#fff;
    margin-top:20px;
    position: relative;

    &::before{
      content:'';
      display: block;
      position: absolute;
      left:0;
      top:20px;
      width:4px;
      height:24px;
      background:@main;
    }
    .title-box{
      width:100%;
      height:65px;
      line-height: 65px;
      text-align: left;
      border-bottom:1px solid @title_border_color;
      .title{
        float: left;
        margin-left:14px;
        font-size:28px;
        color:@font_color;
      }
      .sub-title{
        float: left;
        margin-left:15px;
        margin-top:32px;
        font-size:12px;
        line-height: 12px;
        color:@subtitle_color;
      }
      .position-box{
        float:right;
        width:80px;
        height:26px;
        font-size:12px;
        margin-top:20px;
        margin-right:15px;
        line-height: 26px;
        border-radius: 26px;
        background:@body_color;
        .iconweizhixuanze{
          position:absolute;
          left:12px;
          font-size:14px;
          color:#D51B32;
        }
        .box{
          display: block;
          position: relative;
          width:80px;
          text-align: center;
          outline: none;
          font-size:12px;
          color:#000;
          line-height: 26px;
          cursor: pointer;
          .icon-arrow-down{
            position:absolute;
            top:11px;
            right:10px;
          }
        }
      }
      .more{
        float: right;
        font-size:12px;
        margin-right:20px;
        .iconfont{
          font-size:10px ;
          color:@subtitle_color;
        }
      }
    }
    @media screen and(max-width:@change_width) {
      &{
        width:100%;
        margin-top:10/@p;
      }
      &:before{
        left:15/@p;
        top:18/@p;
        height:18/@p;
      }
     .title-box{
       height:58/@p;
       line-height: 58/@p;
       .title{
         font-size:20/@p;
         margin-left:29/@p;
       }
       .sub-title{
         display: none;
       }
      //  .position-box{
      //    display: none;
      //  }
       .more{
         display: none;
       }
     }
    }
    //商家推荐
    .class-box{
      width:100%;
      overflow: hidden;
      &.goods-class-box{
        margin-bottom: 25px;
      }
       @media screen and(max-width:@change_width) {
          &.goods-class-box{
            height:224/@p;
            margin-bottom:0;
          }
          
        }
      .store-box{ 
        float: left;
        width:299px;
        height:324px;
        overflow: hidden;
        cursor: pointer;
        border-right: 1px solid @class_border;
        &:nth-last-child(1){
          border-color:#FFF;
        }
        img{
          display: block;
          width:250px;
          margin:0 auto;
        }
        .store-name{
          font-size:20px;
          color:@font_color;
          line-height: 20px;
          margin-top:39px;
          margin-bottom:15px;
        }
        .store-percent{
          font-size:14px;
          color:@font_color;
          span{
            color:@percent_color;
          }
        }
        @media screen and(max-width:@change_width) {
            &{
              box-sizing: border-box;
              width: 50%;
              height:187/@p;
              border-bottom:1px solid @body_color ;
            }
            &:nth-last-child(1){
              border-color:@body_color;
            }
             .store-name{
               font-size:15px;
               line-height: 10px;
              margin-bottom:10px;
              margin-top:30px;
             }
             .store-percent{
               font-size:12px;
               line-height: 10px;
             }
             img{
               width:168px;
               margin-top:-20px;
             }
        }
      }
      //推荐
      .recomend-box{
       float: left;
        width:299px;
        height:324px;
        cursor: pointer;
        overflow: hidden;
        border-right: 1px solid @class_border;
        &:nth-last-child(1){
          border-color:#FFF;
        }
        .recomend-title{
          font-size:20px;
          line-height: 20px;
          color:@font_color;
          margin-top:39px;
        }
        .tip{
          font-size:14px;
          color:@placeholder_color;
          margin-top:15px;
          line-height: 14px;
        }
        img{
          display: block;
          width:190px;
          height:190px;
          margin:20px auto 0;
        }
        @media screen and(max-width:@change_width) {
            &{
              box-sizing: border-box;
              width: 50%;
              height:187/@p;
              border-bottom:1px solid @body_color ;
              &:nth-last-child(1){
                border-color:@body_color;
              }
              .recomend-title{
                font-size:15/@p;
                line-height: 10/@p;
                margin-top:30/@p;
              }
              .tip{
                font-size:12px;
                line-height: 10/@p;
              }
              img{
                width:100/@p;
                height:90/@p;
              }
            }
        }
      }
       
      .goods-big-box{
        width:100%;
        overflow:hidden ;
        .goods{
        width:100%;
        overflow: hidden;
       
         }
          @media screen and(max-width:@change_width) {
            &{
              overflow-x:scroll ;
              height:250/@p;
            }
            .goods{
              width:165*4/@p;
              height:230/@p;
            }
          
        }

      }
      
      //新鲜好物
      .goods-box{
        float: left;
        width:299px;
        height:324px;
        overflow: hidden;
        cursor: pointer;
        border-right: 1px solid @class_border;
        &:nth-last-child(1){
          border-color:#FFF;
        }
        img{
          display: block;
          width:146px;
          height:146px;
          margin:49px auto 44px;
        }
        h3{
          font-weight: normal;
          font-size:14px;
          line-height: 14px;
        }
        p{
          font-size:12px;
          line-height: 12px;
          color:@placeholder_color;
          margin-top:12px;
        }
        .price{
          margin-top:12px;
          font-size:16px;
          line-height: 16px;
          font-weight: bold;
          color:@percent_color;
        }
        @media screen and(max-width:@change_width) {
            &{
              box-sizing: border-box;
              width:165/@p;
              height:224/@p;
              img{
                width:130/@p;
                height:130/@p;
                margin-top:15px;
                margin-bottom:7/@p;
              }
              h3{
                font-size:12px;
                line-height: 10px;
              }
              p{
                margin-top:10px;
                font-size:10px;
                line-height: 10px;
              }
              .price{
                margin-top:10px;
                font-size:16px;
                line-height: 10px;
              }
            }
        }
      }
    }
  }
  .class-nav{
    display:none;
    @media screen and(max-width:@change_width) {
      display: block;
      width:100%;
      height:34/@p;
      overflow:hidden;
      margin:25px 0 20px 0;
      .class-nav-scroll-box{
        overflow: hidden;
        overflow-x: scroll;
        height:53/@p;
      }
      .class-nav-scroll{
        padding:0 15px; 
      }
      a{
        float: left;
        height:34/@p;
        line-height: 34/@p;
        font-size:20/@p;
        padding:0 20px;
        color:@subtitle_color;
        border-radius:34/@p;
        &.active{
          color:#fff;
          background:@main;
        }

      }
    }
  }
  .footer-margin{
    height:80px;

  }
  .class-item{
    display: block;
    @media screen and(max-width:@change_width) {
      &{
        display: none;
        &.active{
          display: block;
        }
      }
    }
  }
</style>
