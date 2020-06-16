<template>
  <div>
    <div class="brand-top-nav">
        <router-link tag="a" to="/">首页</router-link>
        <span class="iconfont iconjiantou"></span>
        <span class="now-nav">美食广场</span>
    </div>
    <div class="top">
       <div class="left">

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
               <span class="iconfont icongmsp"></span>购买商品
               </span>
            </div>
            <div class="item">
              <span class="middle">
               <span class="iconfont iconqrsh"></span>确认收货
              </span>
            </div>
            <div class="item">
              <span class="middle">
               <span class="iconfont iconddjs"></span>等待结算
              </span>
            </div>
            <div class="item">
              <span>
               <span class="iconfont iconhdfl"></span>获得返利
              </span>
            </div>
         </div>
         <div class="notice">提醒：使用天猫红包和购物卷将无法返现</div>
         <button  class="btn">立即购买</button>
       </div>
    </div>
    <div class="promote">
        <div class="title">
          同类商品推荐
        </div>
        <el-carousel trigger="click" height="411px">
          <el-carousel-item v-for="item in promoteList" :key="item">
           <div class="goods-box">
             <div class="goods-item" >
                <goodCard :data="item" ></goodCard>
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
             <goodCard :data="item"></goodCard>
           </div>
         </div>
       </div>
    </div>
  </div>
</template>
<script>
import goodCard from '@/components/taobao/goodCard'
export default {
  data(){
    return{
      GoodType:'',
      GoodID:'',
      proudectData:{},
      promoteList:[],
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
</style>