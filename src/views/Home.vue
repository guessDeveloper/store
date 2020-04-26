<template>
  <div class="home">
    <navBar></navBar>
    <navBottom></navBottom>
    <div class="banner">
      <div class="banner-left">
         <classify></classify>
      </div>
      <div class="banner-right">
        <bannerBar></bannerBar>
      </div>
    </div>
    <!-- 商家联盟 -->
    <div class="section-box">
       <div class="title-box">
          <h2 class="title">商家联盟</h2>
          <span class="sub-title">积分直返消费者</span>
       </div>
       <div class="class-box">
          <div class="store-box">
              <div class="store-name">
                天津包子铺
              </div>
              <div class="store-percent">
                返比：<span>20%</span>
              </div>
              <img src="" alt="">
          </div>
          <div class="store-box">
              <div class="store-name">
                天津包子铺
              </div>
              <div class="store-percent">
                返比：<span>20%</span>
              </div>
              <img src="" alt="">
          </div>
          <div class="store-box">
              <div class="store-name">
                天津包子铺
              </div>
              <div class="store-percent">
                返比：<span>20%</span>
              </div>
              <img src="" alt="">
          </div>
          <div class="store-box">
              <div class="store-name">
                天津包子铺
              </div>
              <div class="store-percent">
                返比：<span>20%</span>
              </div>
              <img src="" alt="">
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
              <img src="../assets/img/rec.png" alt="">
          </div>
           <div class="recomend-box">
              <div class="recomend-title">特惠推荐</div>
              <div class="tip">我猜得到 你的需要</div>
              <img src="../assets/img/rec.png" alt="">
          </div>
           <div class="recomend-box">
              <div class="recomend-title">特惠推荐</div>
              <div class="tip">我猜得到 你的需要</div>
              <img src="../assets/img/rec.png" alt="">
          </div>
           <div class="recomend-box">
              <div class="recomend-title">特惠推荐</div>
              <div class="tip">我猜得到 你的需要</div>
              <img src="../assets/img/rec.png" alt="">
          </div>
       </div>
    </div>
    <!-- 新鲜好物 -->
    <div class="section-box">
      <div class="title-box">
          <h2 class="title">新鲜好物</h2>
          <span class="sub-title">为你寻觅世间好物</span>
       </div>
       <div class="class-box">
          <div class="goods-box">
              <img src="../assets/img/good.png" alt="">
              <h3 class="">芒果新鲜水果 热带水果</h3>
              <p>匠心剪裁，垂感质地</p>
              <div class="price">¥249</div>
          </div>
          <div class="goods-box">
              <img src="../assets/img/good.png" alt="">
              <h3 class="">芒果新鲜水果 热带水果</h3>
              <p>匠心剪裁，垂感质地</p>
              <div class="price">¥249</div>
          </div>
          <div class="goods-box">
              <img src="../assets/img/good.png" alt="">
              <h3 class="">芒果新鲜水果 热带水果</h3>
              <p>匠心剪裁，垂感质地</p>
              <div class="price">¥249</div>
          </div>
          <div class="goods-box">
              <img src="../assets/img/good.png" alt="">
              <h3 class="">芒果新鲜水果 热带水果</h3>
              <p>匠心剪裁，垂感质地</p>
              <div class="price">¥249</div>
          </div>
       </div>
    </div>
    <!-- 服装 -->
    <classPart title="服装"></classPart>
    <footerBar></footerBar>
  </div>
</template>

<script>
import  navBar from '@/components/common/nav'
import  navBottom from'@/components/common/nav-bar'
import classify from '@/components/index/banner-left'
import bannerBar from '@/components/index/banner'
import classPart from '@/components/index/section-part'
import footerBar from '@/components/common/footer'
export default {
  name: 'Home',
  mounted(){
 
  },
  components: {
    navBar:navBar,
    navBottom:navBottom,
    classify:classify,
    bannerBar:bannerBar,
    classPart:classPart,
    footerBar:footerBar
  }
}
</script>
<style lang="less" scoped>
@import '../assets/less/common.less';
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
    }
    //商家推荐
    .class-box{
      width:100%;
      overflow: hidden;
      .store-box{
        float: left;
        width:299px;
        height:324px;
        overflow: hidden;
        border-right: 1px solid @body_color;
        &:nth-last-child(1){
          border-color:#FFF;
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
      }
      //推荐
      .recomend-box{
       float: left;
        width:299px;
        height:324px;
        overflow: hidden;
        border-right: 1px solid @body_color;
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
      }
      //新鲜好物
      .goods-box{
         float: left;
        width:299px;
        height:324px;
        overflow: hidden;
        border-right: 1px solid @body_color;
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
      }
    }
  }
</style>
