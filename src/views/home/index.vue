<template>
  <div class="home tc" v-loading="loading">
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
          <router-link class="more" tag="a" to="/shop" target="_blank"> 查看全部 <span class="iconfont iconjiantou"></span></router-link>
          <div class="position-box" >
          <el-dropdown trigger="click" @command="chengeCity" class="select">
            <span class="el-dropdown-link box">
              <span class="iconfont iconweizhixuanze"></span><span class="middle-name">{{nowCity}}</span><span class="icon-arrow-down"></span>
            </span>
            <el-dropdown-menu slot="dropdown" >
              <el-dropdown-item  v-for="(item, index) in cityList" :key="index" :command="item">{{item.CityName}}</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          </div>
       </div>
       <div class="class-box">
          <a class="store-box"   v-for="(item,index) in storeList" target="_blank" :href="item.clickurl">
              <div class="store-name">
                {{item.title1}}
              </div>
              <div class="store-percent">
                <!-- 返比：<span>20%</span> -->
                {{item.title2}}
              </div>
              <div class="img-box" :style="'background:url('+item.picurl+') no-repeat center center'">
                <img src="../../assets/img/1-1.jpg" alt="">
              </div>
          </a>
        
       </div>
    </div>
    <!-- 推荐专区 -->
    <div class="section-box" v-for="(item,index) in promotlist" > 
       <div class="title-box">
          <h2 class="title">{{item.titleA}}</h2>
           <span class="sub-title">{{item.titleB}}</span>
       </div>
       <div class="class-box" v-if="item.CatType == 4">
          <a class="recomend-box" tag="div" to="/special" v-for="(item2,index2) in item.CategorysItems"  :href="item2.cickurl">
              <div class="recomend-title">{{item2.titleA}}</div>
              <div class="tip">{{item2.titleB}}</div>
              <!-- <img :src="item2.picurl" alt=""> -->
              <el-image :src="item2.picurl" lazy class="img" fit="contain">
                <div slot="placeholder" class="image-slot">
                  加载中<span class="dot">...</span>
                </div>
              </el-image>
          </a>
       </div>
       <div class="class-box goods-class-box" v-if="item.CatType == 5">
         <div class="goods-big-box">
            <div class="goods">
              <a class="goods-box" v-for="(item2,index2) in item.CategorysItems" :href="item2.cickurl">
                  <!-- <img :src="item2.picurl" alt=""> -->
                   <el-image :src="item2.picurl" lazy class="img" fit="contain">
                    <div slot="placeholder" class="image-slot">
                      加载中<span class="dot">...</span>
                    </div>
                  </el-image>
                  <h3 class="">{{item2.titleA}}</h3>
                  <p>{{item2.titleB}}</p>
                  <p>{{item2.fanli}}</p>
                  <div class="price">¥{{item2.price}}</div>
              </a>
          
           </div>
        </div>
       </div>
    </div>
    <div class="class-nav">
      <div class="class-nav-scroll-box">
        <div class="class-nav-scroll" >
          <a v-for="(item,index) in classNav" :key="index" :class="{active:item.active == 1}" @click="activeClass(item.Id)">{{item.titleA}}</a>
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
      },],
      nowCity:'',
      loading:false,
      storeActiveIndex:0,
      cityList:[],
      storeList:[],
      promotlist:[],
      
    }
  },
  mounted(){
     this.getCityAndStore();
     this.getClass();
  },
  methods:{
     //获取城市商家联盟
     getCityAndStore(){
       this.loading = true
       this.$http.post(this.$api.GetMerchanters,{CityID:''}).then(res=>{
         if(res.data.Code == 1){
          //  let _this = this;
           let alldata = res.data.Data;
           this.storeList = alldata.length>0?alldata[0].Merchants:[];
           this.nowCity = alldata.length>0?alldata[0].currentcity.CityName:'';
           this.cityList = alldata.length>0?alldata[0].city:[];
         }
         this.loading = false
       })
     },
     chengeCity(item){
       console.log(item,'5555')
       this.$http.post(this.$api.GetMerchanters,{CityID:item.CityId}).then(res=>{
         if(res.data.Code == 1){
          //  let _this = this;
           let alldata = res.data.Data;
           this.storeList = alldata.length>0?alldata[0].Merchants:[];
           this.nowCity = alldata.length>0?alldata[0].currentcity.CityName:'';
           this.cityList = alldata.length>0?alldata[0].city:[];
         }
       })
     },
     //获取分类
     getClass(){
       this.loading = true
       this.$http.get(this.$api.GetCat).then(res=>{
         if(res.data.Code == 1){
             let SysCategorysVoB = res.data.Data.SysCategorysVoB;
             SysCategorysVoB.forEach((element,index) => {
                element.active = 0;
                element.type = (index+1)%4
             });
             
             this.classNav = SysCategorysVoB
             this.classNav[0].active = 1;
             this.promotlist = res.data.Data.SysCategorysVoA
         }
         this.loading = false
       })
     },
     //激活分裂
     activeClass(id){
       this.classNav.forEach((element,index) => {
          if(element.Id == id){
            element.active = 1;
          }else
          {
            element.active = 0
          }
                
       })
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
  // min-height: 100vh;
  // height:200px;
  background:#fff;
}
 @media screen and(max-width:@change_width) {
    .banner{
      box-sizing: border-box;
      width:100%;
      background:#fff;
      margin-top:0;
      padding:0px 15px 20px;
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
        width:110px;
        height:26px;
        font-size:12px;
        margin-top:20px;
        margin-right:15px;
        line-height: 26px;
        border-radius: 26px;
        background:@body_color;
        .select{
          height:100%;
        }
        .middle-name{
          display: inline-block;
          width: 50px;
          padding:0 20px;
          .overTextOne()
        }
        .iconweizhixuanze{
          position:absolute;
          left:5px;
          font-size:14px;
          color:#D51B32;
        }
        .box{
          display: block;
          position: relative;
          width:110px;
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
        color:@font_color;
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
       .position-box{
         margin-top:16/@p!important;
         margin-right:10/@p!important;
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
      //  .more{
      //    display: none;
      //  }
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
            height:244/@p;
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
        .img-box{
          width: 195px;
          height:195px;
          margin:15px auto 0;
          line-height:195px;
          vertical-align:middle;
          background-size: contain!important;
        }
        img{
          display:none;
          width:80%;
          // height:108px;
          max-height:100%;
          margin:0 auto;
          vertical-align:middle;
        
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
              height:auto;
              border-bottom:1px solid @body_color ;
              padding-bottom:15px;
            }
            &:nth-last-child(1){
              border-color:@body_color;
            }
             .store-name{
               font-size:15px;
               line-height: 10px;
              margin-bottom:10px;
              margin-top:30px;
              .overTextOne();
             }
             .store-percent{
               font-size:12px;
               line-height: 10px;
             }
             .img-box{
               display: inline-block;
               width:80%;
               height:auto;
               margin:15px auto 0;
                // line-height:195px;
                vertical-align:middle;
              }
              img{
                display: block;
                width:100%;
                opacity: 0;
                margin-bottom:10px;
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
          width:80%;
          margin:0 auto;
          font-size:14px;
          color:@placeholder_color;
          margin-top:15px;
          line-height: 16px;
          .overTextOne();
        }
        .img{
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
                line-height: 14/@p;
              }
              .img{
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
              height:234/@p;
            }
          
        }

      }
      
      //新鲜好物
      .goods-box{
        float: left;
        width:239px;
        height:348px;
        overflow: hidden;
        cursor: pointer;
        border-right: 1px solid @class_border;
        &:nth-last-child(1){
          border-color:#FFF;
        }
        .img{
          display: block;
          width:146px;
          height:146px;
          margin:49px auto 44px;
        }
        h3{
          width:80%;
          .overTextOne();
          margin:0 auto;
          font-weight: normal;
          font-size:14px;
          color:@font_color;
          line-height: 14px;
        }
        p{
          width:75%;
          .overTextOne();
          margin:0 auto;
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
              height:234/@p;
              .img{
                width:130/@p;
                height:130/@p;
                margin-top:15px;
                margin-bottom:7/@p;
              }
              h3{
                font-size:12px;
                line-height: 14px;
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
        width:100%;
        display: flex;
        flex-flow: row;
        flex-wrap: nowrap;
        overflow: hidden;
        // overflow-x: scroll;
        align-items: center;
        // height:53/@p;
      }
      .class-nav-scroll{
         display:-webkit-box;
        flex: 1;
        flex-flow: nowrap;
        overflow: scroll;
        padding:0 15px; 
      }
      a{
        height:34/@p;
        line-height: 34/@p;
        font-size:20/@p;
        padding:0 20px;
        color:@subtitle_color;
        border-radius:34/@p;
        white-space: nowrap;
        flex-shrink:1;
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
