<template>
  <div>
    <div class="brand-top-nav">
        <router-link tag="a" to="/">首页</router-link>
        <span class="iconfont iconjiantou"></span>
        <span class="now-nav">美食广场</span>
    </div>
    <div class="top">
       <div class="left">
          <div class="big-img-box">
            <img :src="piclist[nowActiveIndex]" alt="">
          </div>
          <div class="imgs-box">
            <div class="img-box">
              <div class="item" v-for="(item,index) in piclist" :key="index">
                <img :src="item" alt="" @click="selecting(index)">
              </div>
            </div>
          </div>
       </div>
       <div class="right">
         <div class="title">
           {{proudectData.titleA}}
         </div>
         <div class="price">
           ¥{{proudectData.Picper}} <span class="score">{{proudectData.Fanli}}</span>
         </div>
         <div class="tip">
            <div class="item">
              <span class="middle">
               <span class="iconfont icongmsp"></span><span class="tip-item-name">购买商品</span>
               </span>
            </div>
            <div class="item">
              <span class="middle">
               <span class="iconfont iconqrsh"></span><span class="tip-item-name">确认收货</span>
              </span>
            </div>
            <div class="item">
              <span class="middle">
               <span class="iconfont iconddjs"></span><span class="tip-item-name">等待结算</span>
              </span>
            </div>
            <div class="item">
              <span>
               <span class="iconfont iconhdfl"></span><span class="tip-item-name">获得返利</span>
              </span>
            </div>
         </div>
         <div class="notice">提醒：使用天猫红包和购物卷将无法返现</div>
         <button  class="btn" @click="buy">立即购买</button>
       </div>
    </div>
    <div class="promote">
        <div class="title">
          同类商品推荐
        </div>
        <el-carousel trigger="click" height="411px">
          <el-carousel-item v-for="(item,index) in promoteList" :key="index">
           <div class="goods-box">
             <div class="goods-item" v-for="(item2,index2) in item" :key="index2">
                <goodCard :item="item2" ></goodCard>
             </div>
           </div>
          </el-carousel-item>
        </el-carousel>
    </div>
    <div class="goods-detial">
       <div class="left">
         <div class="title">商品详情</div>
         <div>

         </div>
       </div>
       <div class="right">
         <div class="title">
             24小时热销榜
         </div>
         <div class="list">
           <div class="" v-for="(item,index) in proudectData.PopProducts" :key="index">
             <goodCard :item="item"></goodCard>
           </div>
         </div>
       </div>
    </div>
  </div>
</template>
<script>
import goodCard from '@/components/recommend/recommendCard'
export default {
  data(){
    return{
      nowActiveIndex:0,
      GoodType:'',
      GoodID:'',
      proudectData:{},
      promoteList:[],
      piclist:[],
    }
  },
  components:{
    goodCard:goodCard
  },
  mounted(){
    if(this.$route.query.GoodType){
      this.GoodType = this.$route.query.GoodType
    }
    if(this.$route.query.GoodID){
     this.GoodID = this.$route.query.GoodID
    }
    this.getDetail();
  },
  methods:{
    //获取产品详情
    getDetail(){
      this.$http.get(this.$api.GetMaterialGoodsById,{
        GoodType:this.GoodType,
        GoodID:this.GoodID
      }).then(res=>{
          if(res.data.Code == 1){
            this.proudectData = res.data.Data
            this.piclist = res.data.Data.piclist
            this.promoteList = this.changeArray(res.data.Data.SameClassproducts)
            console.log(this.promoteList)
          }
      })
    },
     //数组转换
    changeArray(arry){
      let att = [];
      let length = arry.length;
      let count = Math.ceil(length/4)
      let num = 0
      for(let i = 0;i<count;i++){
        let attr = [];
        arry[num+0]?attr.push(arry[num+0]):''
        arry[num+1]?attr.push(arry[num+1]):''
        arry[num+2]?attr.push(arry[num+2]):''
        arry[num+3]?attr.push(arry[num+3]):''
        att.push(attr)
        num++
      }
      return att
    },
    //购买
    buy(){
      this.$http.limitGet(this.$api.clickTobuy,{
        type:this.GoodType,
        id:this.GoodID
      }).then(res=>{
         if(res.data.Code == 1){
           window.location.href = res.data.Data
         }
      })
    },
    //轮播图
    selecting(index){
      this.nowActiveIndex = index;
    }
  },


}
</script>
<style lang="less" scoped>
.top{
  width:@max-width;
  margin:0 auto;
  height:408px;
  background:#fff;
  .left{
    float: left;
    width:490px;
    height:100%;
    box-sizing: border-box;
    padding:30px 40px 0 30px;
    .big-img-box{
      float: left;
      width:348px;
      height:348px;
      img{
        display: block;
        width:100%;
        height:100%;
      }
    }
    .imgs-box{
      float:right;
      width:60px;
      height:348px;
      overflow: hidden;
      .imgs-box{
        overflow: hidden;
      }
      .item{
        display: block;
        width:60px;
        padding-bottom:12px;
        img{
          display: block;
          width:60px;
          height:60px;
          cursor: pointer;
        }
      }
    }

  }
  .right{
    box-sizing: border-box;
    padding:30px 30px 0 0;
    float: right;
    width:710px;
    height:100%;
    .title{
      font-size:26px;
      line-height: 40px;

    }
    .price{
      font-size:32px;
      color:#D51B32;
      .score{
        margin-left:15px;
        font-size:14px;
        color:@subtitle_color;
      }
    }
    .tip{
      overflow: hidden;
      .item{
        float: left;
        width:112px;
        height:46px;
        text-align: center;
        margin-right:20px;
        line-height:46px;
        border:1px solid @main;
        font-size:14px;
        color:@main;
        .middle{
           line-height: 22px;
        }
        .iconfont{
          display: inline-block;
          font-size:22px;
          margin-top:-4px;
          margin-right:14px;
          vertical-align: middle;
        }
      }
    }
  }
  .notice{
    font-size:12px;
    margin-top:20px;
    color:@subtitle_color;
  }
  .btn{
    width:200px;
    height:50px;
    margin-top:36px;
    border:1px solid @main;
    font-size:18px;
    color:@main;
  }
}
.promote{
   width:@max-width;
   margin:20px auto;
   background:#fff;
   .title{
     font-size:20px;
     line-height: 68px;
     padding-left:30px;
     border-bottom:1px solid @class_border;
   }
   .goods-box{
     width:1040px;
     margin:0 auto;
     overflow: hidden;
     padding-top:40px;
     .goods-item{
       float:left;
       width:220px;
       margin:0 20px;
     }
   }
}
.goods-detial{
  overflow: hidden;
  width:@max-width;
   margin:20px auto;
  .title{
     font-size:20px;
     line-height: 68px;
     padding-left:30px;
     border-bottom:1px solid @class_border;
   }
  .left{
    float:left;
    width:900px;
    background:#fff;
  }
  .right{
    float:right;
    width:280px;
    background:#fff;
    .list{
      padding:30px;
    }
  }
}
@media screen and(max-width:@change_width) {
  .top {
    width: 100%;
    height: auto;
    .left {
      float: none;
      width: 100%;
      padding: 0;
      .big-img-box {
        float: none;
        width: 100%;
        box-sizing: border-box;
      }
      .imgs-box {
        display: none;
      }
    }
    .right {
      float: none;
      padding: 15px;
      width: 100%;
      .title {
        font-size: 20px;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
      }
      .price {
        font-size: 24px;
      }
      .tip {
        display: flex;
        justify-content: space-between;
        padding: 15px 15px 0;
        .item {
          width: 50px;
          height: 50px;
          margin-bottom: 30px;
          line-height: 50px;
          border-radius: 50%;
          border: 1px solid #eeeeee;
          text-align: center;
          &>span {
            position: relative;
            display: block;
            line-height: 50px;
            .iconfont {
              margin: 0;
            }
            .tip-item-name {
              position: absolute;
              display: block;
              left: 50%;
              bottom: -40px;
              width: 60px;
              transform: translateX(-50%);
            }
          }
          .middle {
            line-height: 50px;
          }
          &:last-child{
            margin-right: 0;
          }
        }
      }
      .btn {
        width: 100%;
        margin-top: 30px;
      }
    }
  }
  .promote {
    width: 100%;
    margin: 10px auto;
    .title {
      line-height: 58px;
      // padding-left: 15px;
      position: relative;
      &::before {
        content: '';
        position: absolute;
        width: 4px;
        height: 40%;
        background-color: #F38A1D;
        left: 15px;
        top: 50%;
        transform: translateY(-50%);
      }
    }
    .goods-box {
      padding-top: 0;
    }
  }
  .goods-detial {
    width: 100%;
    .left {
      float: none;
      .title {
        line-height: 58px;
        // padding-left: 15px;
        position: relative;
        &::before {
          content: '';
          position: absolute;
          width: 4px;
          height: 40%;
          background-color: #F38A1D;
          left: 15px;
          top: 50%;
          transform: translateY(-50%);
        }
      }
    }
    .right {
      float: none;
      width: 100%;
      padding-bottom: 20px;
      .list {
        padding: 15px;
        display: flex;
        flex-wrap: wrap;
        &>div {
          width: 50%;
          box-sizing: border-box;
        }
        &>div:nth-child(odd) {
          padding-right: 7px;
        }
        &>div:nth-child(even) {
          padding-left: 7px;
        }
      }
    }
  }
}
</style>
