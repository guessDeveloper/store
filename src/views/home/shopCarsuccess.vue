<template>
  <div>
   <div class="title">
     提交成功
   </div>
   <div class="box">
      <span class="iconfont iconqrwc"></span>
      <div class="sucess">订单提交成功</div>
      <div class="tip">
        请您在商家完成支付，商家确认后，可以获得积分约 {{score}}
      </div>
      <div class="money">
        支付金额：<span>¥{{money}}</span>
      </div>
      <div class="btn-box">
         <button  class="btn ok" @click="back">返回商家</button>
         <router-link class="btn" to="/myOrder?tab=2" tag="button">查看订单</router-link>
      </div>
   </div>
   </div>
</template>
<script>
export default {
  data(){
    return{
       money:'',
       score:'',
       storeId:''
    }
  },
  mounted(){
    this.$route.query.money?this.money = this.$route.query.money:''
    this.$route.query.score?this.score = this.$route.query.score:''
    this.$route.query.storeId?this.storeId = this.$route.query.storeId:''
  },
  methods:{
    back(){
      this.$router.push(`/foodList?id=${this.storeId}`)
    }
  }
}
</script>
<style lang="less" scoped>
  .title{
    position: relative;
    width:@max-width;
    font-size:28px;
    line-height: 24px;
    padding-left:14px;
    margin:30px auto 20px;
    &::before{
      display: block;
      content:'';
      position: absolute;
      left:0;
      width:4px;
      height:24px;
      background:@main;
      
    }
    @media screen and(max-width:@change_width){
      width:auto;
      height:58px;
      line-height: 58px;
      font-size: 20px;
      padding-left:29px;
      background:#fff;
      margin:10px auto;
      &::before{
        left: 15px;
        top:20px;
      }
    }
  }
  .box{
    width:100%;
    background:#fff;
    text-align: center;
    padding-bottom:88px;
    .iconfont{
      font-size:100px;
      color:@main;
    }
    .sucess{
      font-size:18px;
      line-height: 18px;
      color:@main;
    }
    .tip{
      font-size:12px;
      color:@subtitle_color;
      line-height: 14px;
      margin-top:15px;
    }
    .money{
      font-size:18px;
      line-height: 14px;
      margin-top:20px;
      span{
        color:#D51B32;
        font-weight: bold;
      }
    }
  }
  .btn-box{
    display: inline-block;
    .btn{
      width:140px;
      height:50px;
      border:1px solid @main;
      color:@main;
      font-size: 16px;
      margin-top:30px;
      &.ok{
        background:@main;
        color:#fff;
        margin-right:20px;
      }
    }
  }
</style>