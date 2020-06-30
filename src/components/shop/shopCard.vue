<template>
  <div class="shop-card-box" >
     <div class="img-box" @click="goDetail">
        <img :src="item.MertchatLogo" alt="">
     </div>
     <div class="des-box"  >
       <div class="title" @click="goDetail" >
          <img src="../../assets/img/brand.png" alt="" class="icon">
          <h3>{{item.titleName}}</h3>
       </div>
       <div class="score-box">
         <span>商家诚信积分：<strong class="blue">{{item.ReputationIntegral}}</strong></span><span style="margin-left:20px;">剩余积分：<strong class="red">{{item.ResidueIntegral}}</strong></span>
       </div>
       <div class="score-box" style="margin-top:18px;">
         任务奖励：<strong class="red">{{item.Fanli}}%</strong>
       </div>
       <div class="score-box" style="margin-top:18px;">
         距离：<strong class="bad">{{item.distance}}</strong>
         <div class="position">
            <span class="iconfont iconweizhixuanze"></span><a @click="toMap = true" class="pc">{{item.CityName}}</a> <a :href="mapUrl" class="phone">{{item.CityName}}</a>

         </div>
       </div>
     </div>
    <el-dialog title="商家位置" :visible.sync="toMap" custom-class="custom-dialog" :before-close="close">
       <shopMap  :defaultPoint="mapPorint" ref="map"></shopMap>
    </el-dialog>
  </div>
</template>
<script>
import shopMap from '@/components/shop/shopMap';
export default {
  data(){
    return{
      toMap:false,
      mapPorint:{},
    }
  },
  props:{
    item:{
      type:Object,
      default:null
    }
  },
  computed:{
     mapUrl(){
      return `http://api.map.baidu.com/marker?location=${this.mapPorint.MertchntY},${this.mapPorint.MertchntX}&title=商家地址&content=${this.detial.Mertchntname}&output=html&src=webapp.baidu.openAPIdemo`
    },
  },
  mounted(){
     this.mapPorint.MertchntX = this.item.PointX
     this.mapPorint.MertchntY = this.item.PointY
  },
  components:{
    shopMap:shopMap
  },
  methods:{
     goDetail(){
      this.$router.push(`/shopDetail?id=${this.item.MertchatId}`);
    },
    showMap(){
      this.toMap = true;
      this.$refs.map.show();
    },
    close(){
      this.$refs.map.destroy();
      this.toMap = false;
    }
  }
}
</script>
<style lang="less" scoped>
.shop-card-box{
  box-sizing: border-box;
  position: relative;
  width:100%;
  height:155px;
  text-align: center;
  border:1px solid @class_border;
  .img-box{
    float: left;
    width:275px;
    height:100%;
    overflow: hidden;
    position: relative;
    img{
      position: absolute;;
      top:0;
      left:50%;
      transform: translate(-50%,0);
      display: block;
      height:100%;
    }
  }
  .des-box{
    padding-left: 295px;
    padding-right:20px;
    text-align: left;
    height:100%;
    
    .title{
      line-height: 30px;
      margin-top:20px;
      cursor: pointer;
      img{
        float:left;
        width:30px;
        height:30px;
        margin-right:10px;
      }
      h3{
        font-size:16px;
        line-height: 30px;
      }
    }
    .score-box{
      line-height: 12px;
      margin-top:13px;
      color:@subtitle_color;
      font-size:12px;

      .red{
        color:@percent_color;
      }
      .blue{
        color:@comment_num_color;
      }
      .bad{
        color:@font_color;
      }
      .position{
        float:right;
        line-height: 14px;
        .iconfont{
          font-size:14px;
          color:@percent_color;
        }
        a{
          margin-left:4px;
          color:@font_color;
          text-decoration: underline;
          &.pc{
            display: block;
          }
          &.phone{
            display: none;
          }
        }
      }
    }
  }
}
@media screen and(max-width:@change_width) {
  .shop-card-box {
    border: 0;
    height: auto;
    .img-box {
      float: none;
      width: 100%;
      height: 195px;
    }
    .des-box {
      padding: 0 15px 20px;
      height: auto;
      .score-box{
         .position{
            a{
          margin-left:4px;
          color:@font_color;
          text-decoration: underline;
          &.pc{
            display: none;
          }
          &.phone{
            display: block;
          }
        }
         }
      }
    }
  }
}
</style>
