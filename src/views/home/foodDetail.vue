<template>
  <div>
     <div class="brand-top-nav">
        <router-link tag="a" to="/">首页</router-link>
        <span class="iconfont iconjiantou"></span>
        <span class="now-nav">逛街购物</span>
    </div>
    <div class="detail">
       <div class="detail-left"></div>
       <div class="detail-right">
         <div class="goods-box">
            <img src="../../assets/img/good.png" alt="" class="logo">
            <div class="des">
              <h2>聚美优品</h2>
              <p>国内知名品牌</p>
            </div>
         </div>
         <div class="icon-box phone">
            <span class="name">联系方式：</span>010-5589999
         </div>
          <div class="icon-box adress">
            <span class="name">商家地址：</span><a href="">通州区城铁八通线九棵树站京通罗斯福广场3层</a>
         </div>
         <div class="icon-box">
            <span class="name">商家故事：</span>聚美优品坚持只从品牌厂家、正规代理商、国内外专柜等可信的进货渠道采购商品，并在采购部专门设置自己的质检员。让消费者拥有良好的服务体验，进而取得消费者的信任。从2010年3月成立至今，凭借口碑传播，短短一年半就从月销售额不足10万元发展到当月销售上亿元的规模。聚美优品拥…
         </div>
         <div class="score-box">
           <div class="line">奖励比例：<span class="num red">5%-20%</span></div>
           <div class="line">商家诚信积分：<span class="num blue">90</span></div>
           <div class="line">商家剩余积分：<span class="num yellow">8983993</span></div>
         </div>
       </div>
    </div>
    <div class="goods-about">
      <h3 class="title">
            全部商品 <span>100</span>
      </h3>
      <ul class="good-list">
             <li><goodCard></goodCard></li>
             <li><goodCard></goodCard></li>
             <li><goodCard></goodCard></li>
             <li><goodCard></goodCard></li>
             <li><goodCard></goodCard></li>
             <li><goodCard></goodCard></li>
        </ul>
    </div>
    <div class="comment-list-box">
      <h3 class="title">
              全部评价 <span>100</span>
          </h3>
        
            <ul class="comment-list">
              <li>
                <commentCard></commentCard>
              </li>
              <li>
                <commentCard></commentCard>
              </li>
              <li>
                <commentCard></commentCard>
              </li>
              <li>
                <commentCard></commentCard>
              </li>
              <li>
                <commentCard></commentCard>
              </li>
              <li>
                <commentCard></commentCard>
              </li>
          </ul>
    </div>
  </div>
</template>
<script>
import goodCard from '@/components/food/foodListCard'
import commentCard from '@/components/common/commentCard'
export default {
  data(){
    return{

    }
  },
  components:{
    goodCard:goodCard,
    commentCard:commentCard
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
    height:100%;
    background:#ccc;
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
</style>