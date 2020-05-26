<template>
  <div class="shop-card-box" >
     <div class="img-box" @click="goDetail">
        <img src="../../assets/img/banner.png" alt="">
     </div>
     <div class="des-box">
       <div class="title">
          <img src="../../assets/img/brand.png" alt="" class="icon">
          <h3>全聚德烤鸭店（昌平店）</h3>
       </div>
       <div class="score-box">
         <span>商家诚信积分：<strong class="blue">100</strong></span><span style="margin-left:20px;">剩余积分：<strong class="red">100</strong></span>
       </div>
       <div class="score-box" style="margin-top:18px;">
         任务奖励：<strong class="red">5%-20%</strong>
       </div>
       <div class="score-box" style="margin-top:18px;">
         距离：<strong class="bad">&lt; 500m</strong>
         <div class="position">
            <span class="iconfont iconweizhixuanze"></span><a href="">北京</a>
         </div>
       </div>
     </div>
  </div>
</template>
<script>
export default {
  data(){
    return{

    }
  },
  methods:{
     goDetail(){
            this.$router.push('/earthDetail');
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
        }
      }
    }
  }
}
</style>