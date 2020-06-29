<template>
  <div class="card-box" >
     <img :src="item.MertchatImage" alt="" @click="goDetail">
     <div class="card-des" @click="goDetail">
        <h4>
          {{item.MertchatName}}  <div class="work">任务奖励：<span>{{item.MertchntMaxFanli}}%</span></div>
        </h4>
        <p>{{item.MertchatTitel}}</p>
        <div class="score">
          <div class="first">商家诚信积分：<span class="blue">{{item.MertchntReputationIntegral}}</span></div>
          <div>商家剩余积分：<span class="red">{{item.MertchntResidueIntegral}}</span></div>
        </div>
        <div class="position">距离：<strong>{{item.distance}}</strong></div>
     </div>
  </div>
</template>
<script>
export default {
   data(){
     return{
       
     }
   },
   props:{
     item:{
       type:Object
     }
   },
   methods:{
     goDetail(){
       this.$router.push(`/fooddetail?id=${this.item.MertchntID}`);
     }
   }
}
</script>
<style lang="less" scoped>
.card-box{
 width: 100%;
 box-sizing: border-box;
 text-align: center;
 border:1px solid @class_border;
 img{
   display: block;
   width:100%;
   height:214px;
 }
 .card-des{
   border-top:0;
   padding:0 20px 30px;
   position: relative;
   .position{
     position:absolute;
     right:20px;
     bottom:30px;
     line-height: 12px;
     font-size:12px;
     color:@subtitle_color;
     strong{
       color:@font_color;
       font-weight: bold;
     }
   }
   h4{
     text-align: left;
     font-size: 16px;
     line-height: 16px;
     margin-top:20px;
     .work{
       float:right;
       font-size:12px;
       color:@subtitle_color;
       span{
         color:@percent_color;
         font-weight: 600;
       }
     }
   }
   p{
     text-align: left;
     font-size:12px;
     color:@subtitle_color;
     line-height: 12px;
     margin-top:12px;
     margin-bottom:25px;
     .overTextOne();
   }
   .score{
     font-size:12px;
     line-height: 12px;
     color:@subtitle_color;
     text-align: left;
     .first{
       margin-bottom:15px;
     }
     .blue{
       color:#4A90E2;
       font-weight: bold;
     }
     .red{
       color:@percent_color;
       font-weight: bold;
     }
   }
 }
}
</style>